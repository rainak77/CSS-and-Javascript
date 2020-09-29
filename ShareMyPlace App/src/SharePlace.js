import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';



class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');
        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    }

    sharePlaceHandler() {
        const sharedLinkElement = document.getElementById('share-link');

        if (!navigator.geolocation) {
            sharedLinkElement.select();
            return;
        }
        navigator.clipboard.writeText(sharedLinkElement.value).then(() => {
            alert('Copied into clipboard.');
        }).catch((error) => {
            console.log(error.message);
            sharedLinkElement.select();

        });
    }


    selectPlace(coords, address) {
        if (this.map) {
            this.map.render(coords);
        } else {
            this.map = new Map(coords);
        }
        this.shareBtn.disabled = false;

        const sharedLinkElement = document.getElementById('share-link');
        sharedLinkElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coords.lat}&lng=${coords.lng}`;
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('Location feature not available by browzer or Enter Address');
            return;
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait......');
        modal.show();
        navigator.geolocation.getCurrentPosition(
            async successResult => {
                const coordinates = {
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };
                const address = await getAddressFromCoords(coordinates);
                modal.hide();
                this.selectPlace(coordinates, address);
            },
            error => {
                modal.hide();
                alert('could not locate you. Plese enter address manually');
            });
    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invalid address');
            return;
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait......');
        modal.show();
        const coordinates = await getCoordsFromAddress(address);
        try {
            const coordinates = await getCoordsFromAddress(address);
            this.selectPlace(coordinates, address);
        }
        catch (err) {
            console.log(err.message);
        }
        modal.hide();
    }
}

new PlaceFinder();