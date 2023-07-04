import { useState, useEffect } from 'react';
import { UPDATE_HOOK_USE_CURRENT_PRESENTATION, UPDATE_HOOK_USE_CURRENT_PRESENTATION_NEW_SUBSCRIBER } from '../utils/enums/presentation';
import { CurrentPresentation } from '../types/'

const useCurrentPresentation: () => CurrentPresentation | undefined = () => {
    const [presentationInfo, setPresentationInfo] = useState<CurrentPresentation | undefined>();
    const handleCurrentPresentationUpdateEvent = (event: any) => {
        setPresentationInfo(event.detail.data);
        console.log(event);
    }

    useEffect(() => {
        window.addEventListener(UPDATE_HOOK_USE_CURRENT_PRESENTATION, handleCurrentPresentationUpdateEvent)
        window.dispatchEvent(new Event(UPDATE_HOOK_USE_CURRENT_PRESENTATION_NEW_SUBSCRIBER));
        return () => {
            window.removeEventListener(UPDATE_HOOK_USE_CURRENT_PRESENTATION, handleCurrentPresentationUpdateEvent)
        }
    }, [])
    return presentationInfo
};

export {useCurrentPresentation}
