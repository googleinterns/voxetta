import * as ToastUtils from '../../src/utils/ToastUtils.js';

describe('Testing that the Toast Utils', () => {
    beforeEach(() => {
        document.querySelector('body').appendChild(document.createElement('p'));
    });

    it('emits an error event', () => {
        const dummyElement = document.querySelector('p');

        // Listen for event to be thrown; assign to "event" if so
        let event;
        window.addEventListener('update-toast', (e) => {
            event = e;
        });

        // Dispatch error toast event
        const string = 'mocked error';
        ToastUtils.dispatchErrorToast(dummyElement, string);

        // Assert that error toast was thrown
        expect(event.detail.state).toEqual(ToastUtils.states.ERROR);
        expect(event.detail.message).toEqual(string);
    });

    it('emits an inactive event', () => {
        const dummyElement = document.querySelector('p');

        // Listen for event to be thrown; assign to "event" if so
        let event;
        window.addEventListener('update-toast', (e) => {
            event = e;
        });

        // Dispatch inactive toast event
        ToastUtils.clearToast(dummyElement);

        // Assert that inactive toast was thrown
        expect(event.detail.state).toEqual(ToastUtils.states.INACTIVE);
    });
});
