class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // {lat : 4.87358, lon : 4.73452374}
        this.id = new Date.toString() + Math.random().toString();
    }
}