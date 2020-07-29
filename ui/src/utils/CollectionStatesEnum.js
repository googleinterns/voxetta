/**
 * States that define various steps in the Collection process.
 * NOT_RECORDING = New prompt loaded, user has not started recording
 * RECORDING = User is recording the prompt
 * BEFORE_UPLOAD = Awaiting user to confirm or re-record their utterance
 * TRANSITIONING = Utterance submitted, loading next prompt
 * QC_ERROR = (After RECORDING) Recording has failed an auto QC check
 * UPLOAD_ERROR = (After BEFORE_UPLOAD) Utterance failed to upload, likely because of a connection issue
 */
export const CollectionStates = {
    NOT_RECORDING: 'NOT_RECORDING',
    RECORDING: 'RECORDING',
    BEFORE_UPLOAD: 'BEFORE_UPLOAD',
    TRANSITIONING: 'TRANSITIONING',
    QC_ERROR: 'QC_ERROR',
    UPLOAD_ERROR: 'UPLOAD_ERROR',
};
