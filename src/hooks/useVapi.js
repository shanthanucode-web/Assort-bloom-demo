import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

const PUBLIC_KEY   = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

// call status values: 'idle' | 'connecting' | 'active' | 'ended'

export function useVapi() {
  const vapiRef       = useRef(null);
  const callEndedRef  = useRef(false);
  const [callStatus,  setCallStatus]  = useState('idle');
  const [transcript,  setTranscript]  = useState([]);
  const [isSpeaking,  setIsSpeaking]  = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    if (!PUBLIC_KEY) return;

    const vapi = new Vapi(PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setCallStatus('active');
      setError(null);
    });

    vapi.on('call-end', () => {
      callEndedRef.current = true;
      setCallStatus('ended');
      setIsSpeaking(false);
      setVolumeLevel(0);
    });

    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end',   () => setIsSpeaking(false));

    vapi.on('volume-level', (level) => setVolumeLevel(level));

    vapi.on('message', (message) => {
      if (message.type !== 'transcript') return;

      const { role, transcript: text, transcriptType } = message;

      setTranscript((prev) => {
        if (transcriptType === 'partial') {
          // Update the last partial entry for this role, or append a new one
          const lastPartialIdx = [...prev].reverse().findIndex(
            (t) => t.role === role && t.partial
          );
          if (lastPartialIdx !== -1) {
            const realIdx = prev.length - 1 - lastPartialIdx;
            const updated = [...prev];
            updated[realIdx] = { ...updated[realIdx], text };
            return updated;
          }
          return [...prev, { id: `${Date.now()}-${role}`, role, text, partial: true }];
        }

        // Final: remove any trailing partial for this role, append final
        const withoutPartial = prev.filter(
          (t, i) => !(t.role === role && t.partial && i === prev.length - 1)
        );
        return [
          ...withoutPartial,
          { id: `${Date.now()}-${role}-final`, role, text, partial: false },
        ];
      });
    });

    vapi.on('error', (err) => {
      // Ignore errors that fire as a side-effect of a normal assistant-ended call
      if (callEndedRef.current) {
        callEndedRef.current = false;
        return;
      }
      console.error('VAPI error:', err);
      setError(err?.message ?? 'Something went wrong. Please try again.');
      setCallStatus('idle');
    });

    return () => {
      vapi.stop();
    };
  }, []);

  const startCall = useCallback(async () => {
    if (!vapiRef.current) {
      setError('VAPI not initialized. Check your .env configuration.');
      return;
    }
    if (!ASSISTANT_ID) {
      setError('VITE_VAPI_ASSISTANT_ID is missing from your .env file.');
      return;
    }
    callEndedRef.current = false;
    setCallStatus('connecting');
    setTranscript([]);
    setError(null);
    try {
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (err) {
      console.error('Failed to start call:', err);
      setError(err?.message ?? 'Failed to connect. Please try again.');
      setCallStatus('idle');
    }
  }, []);

  const endCall = useCallback(() => {
    vapiRef.current?.stop();
    setCallStatus('ended');
    setIsSpeaking(false);
    setVolumeLevel(0);
  }, []);

  const resetCall = useCallback(() => {
    setCallStatus('idle');
    setTranscript([]);
    setError(null);
    setVolumeLevel(0);
  }, []);

  return {
    callStatus,
    transcript,
    isSpeaking,
    volumeLevel,
    error,
    startCall,
    endCall,
    resetCall,
  };
}
