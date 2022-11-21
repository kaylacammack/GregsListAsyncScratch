export class Car {
    constructor(data) {
        this.make = data.make
        this.model = data.model
        this.year = data.year
        this.price = data.price
        this.imgUrl = data.imgUrl
        this.description = data.description
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.color = data.color
        this.id = data.id
    }

    get ListTemplate() {
        return /*html*/`
            <div class="col-4 p-4">
			    <div class="card">
				    <h5>${this.year} ${this.make} ${this.model}</h5>
				    <h6>${this.price}</h6>
				    <img
					    src="${this.imgUrl}"
					    alt="Picture of car"
				    />
				    <div class="d-flex justify-content-between">
					    <button
						    onclick="app.carController.setActiveCar('${this.id}')"
						    class="btn btn-primary"
						    data-bs-toggle="modal"
						    data-bs-target="#details"
						    >
							    See Details
					    </button>
						<button
                            onclick="app.carController.editCarModal('${this.id}')"
							class="btn btn-warning"
							data-bs-toggle="modal"
							data-bs-target="#details"
						>
							Edit Car
						</button>
						<button
							onclick="app.carController.deleteCarById('${this.id}')"
							title="Delete car"
							class="btn btn-danger"
						>
							<i class="mdi mdi-delete"></i>
						</button>
					</div>
				</div>
			</div>`
    }

    get DetailsTemplate() {
        return /*html*/ `
            <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel">
                    ${this.year} ${this.make} ${this.model} - ${this.price}
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <img
                src="${this.imgUrl}"
                alt="Picture of car"
                class="img-fluid"
                />
                <p>${this.description}</p>
                <p>Created at: ${this.createdAt.toLocaleDateString()}</p>
                <p>Updated at: ${this.updatedAt.toLocaleDateString()}</p>
            </div>
            <div class="modal-footer">
                <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                >
                Close
                </button>
            </div>`
    }


    get EditCarDetailsTemplate() {
        return /*html*/ `
            <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel">
                Edit Car Details
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <form onsubmit="app.carController.editCarById('${this.id}')">
                    <div class="form-floating mb-3">
                        <input
                        required
                        type="text"
                        minlength="3"
                        class="form-control"
                        id="car-make"
                        placeholder="Car Make"
                        name="make"
                        value="${this.make}"
                        />
                        <label for="car-make">Make</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="text"
                            class="form-control"
                            id="car-model"
                            placeholder="Car Model"
                            name="model"
                            value="${this.model}"
                        />
                        <label for="car-model">Model</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="url"
                            class="form-control"
                            id="car-img"
                            placeholder="Car Image"
                            name="imgUrl"
                            value="${this.imgUrl}"
                        />
                        <label for="car-img">Image</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="number"
                            class="form-control"
                            id="car-price"
                            placeholder="Car Price"
                            name="price"
                            value="${this.price}"
                        />
                        <label for="car-price">Price</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="number"
                            class="form-control"
                            id="car-year"
                            placeholder="Car Year"
                            name="year"
                            value="${this.year}"
                        />
                        <label for="car-year">Year</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="color"
                            class="form-control"
                            id="car-color"
                            placeholder="Car Color"
                            name="color"
                            value="${this.color}"
                        />
                        <label for="car-color">Color</label>
                    </div>
                    <div class="form-floating">
                        <textarea
                            class="form-control"
                            placeholder="Leave a description here"
                            id="car-description"
                            name="description"
                        >${this.description}</textarea
                        >
                        <label for="car-description"
                        >Description</label
                        >
                    </div>
                    <button
                        type="submit"
                        class="btn btn-success mt-3"
                    >
                    Submit
                    </button>
                    <button
                        type="reset"
                        class="btn btn-outline-danger mt-3"
                    >
                    Reset
                    </button>
                </form>
            </div>
            <div class="modal-footer">
            </div>
        `
    }

    get AddCarTemplate() {
        return /*html*/ `
        <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">
                Add Car
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
    <div class="modal-body">
        <form onsubmit="app.carController.createCar()">
            <div class="form-floating mb-3">
                <input
                    required
                    type="text"
                    minlength="3"
                    class="form-control"
                    id="car-make"
                    placeholder="Car Make"
                    name="make"
                    value="make"
                />
                <label for="car-make">Make</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="text"
                    class="form-control"
                    id="car-model"
                    placeholder="Car Model"
                    name="model"
                    value="model"
                />
                <label for="car-model">Model</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="url"
                    class="form-control"
                    id="car-img"
                    placeholder="Car Image"
                    name="imgUrl"
                    value="imgUrl"
                />
                <label for="car-img">Image</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="car-price"
                    placeholder="Car Price"
                    name="price"
                />
                <label for="car-price">Price</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="car-year"
                    placeholder="Car Year"
                    name="year"
                />
                <label for="car-year">Year</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="color"
                    class="form-control"
                    id="car-color"
                    placeholder="Car Color"
                    name="color"
                />
                <label for="car-color">Color</label>
            </div>
            <div class="form-floating">
                <textarea
                    class="form-control"
                    placeholder="Leave a description here"
                    id="car-description"
                    name="description"
                >
                Description</textarea
                >
                <label for="car-description"
                    >Description</label
                >
            </div>
            <button
                type="submit"
                class="btn btn-success mt-3"
            >
                Submit
            </button>
            <button
                type="reset"
                class="btn btn-outline-danger mt-3"
            >
                Reset
            </button>
        </form>
    </div>
    <div class="modal-footer">
            </div>
        `
    }
}