type Position = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
export interface PopupConfig {
    title?: string,
    data?: any,
    position: Position,
    closable?: boolean,
    draggable?: boolean,
    width?: string,
    isModal?: boolean;
    dismissableMask?: boolean;
    customHeader?: boolean;
    height?: string;
};

export const PopupConfigIntialData: PopupConfig = {
    title: 'Details',
    position: 'right',
    closable: false,
    dismissableMask: false,
    draggable: false,
    isModal: true,
    width: '40rem',
    customHeader: true,
    height: '100vh',
}