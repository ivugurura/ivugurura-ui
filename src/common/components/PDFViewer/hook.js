import * as React from 'react';

const DEFAULT_REQUEST_TIMEOUT_IN_MS = 5000;

const generateRandomID = () => {
  return Math.random().toString(36).substring(2, 15);
};

export function sendEvent(iframe, payload) {
  const requestId = generateRandomID();
  return new Promise()((resolve) => {
    try {
      const handleMessage = (event) => {
        const parsedEvent = (() => {
          try {
            const pEvent = JSON.parse(event.data);

            if (pEvent.type !== 'REQUEST_RESULT') {
              return {
                data: {
                  request_id: null,
                },
              };
            }

            return parsedEvent;
          } catch (e) {
            return null;
          }
        })();
        const isTargetIframe = event.source === iframe.contentWindow;
        const isMatchingResponse = parsedEvent.data.request_id === requestId;

        if (isTargetIframe && isMatchingResponse) {
          resolve(parsedEvent.data.result);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);

      iframe.contentWindow?.postMessage(
        JSON.stringify({ ...payload, request_id: requestId }),
        '*',
      );

      const timeoutId = setTimeout(() => {
        resolve({
          success: false,
          error: {
            code: 'unexpected:request_timed_out',
            message: 'The request timed out: try again',
          },
        });
        window.removeEventListener('message', handleMessage);
      }, DEFAULT_REQUEST_TIMEOUT_IN_MS);

      const cleanup = () => clearTimeout(timeoutId);
      window.addEventListener('message', cleanup);
    } catch (e) {
      const error = e;
      resolve({
        success: false,
        error: {
          code: 'unexpected:failed_processing_request',
          message: `The following error happened: ${error.name}:${error.message}`,
        },
      });
    }
  });
}

export const useEmbed = () => {
  const embedRef = React.useRef(null);

  const handleSubmit = React.useCallback(async ({ downloadCopyOnDevice }) => {
    if (embedRef.current === null) {
      return Promise.resolve({
        success: false,
        error: {
          code: 'bad_request:embed_ref_not_available',
          message:
            'embedRef is not available: make sure to pass embedRef to the <Embed /> component',
        },
      });
    }

    const result = await embedRef.current.submit({ downloadCopyOnDevice });

    return result;
  }, []);

  const handleSelectTool = React.useCallback(async (toolType) => {
    if (embedRef.current === null) {
      return Promise.resolve({
        success: false,
        error: {
          code: 'bad_request:embed_ref_not_available',
          message:
            'embedRef is not available: make sure to pass embedRef to the <Embed /> component',
        },
      });
    }

    const result = await embedRef.current.selectTool(toolType);

    return result;
  }, []);

  return {
    embedRef,
    actions: {
      submit: handleSubmit,
      selectTool: handleSelectTool,
    },
  };
};
