export class Home {
    constructor(data) {
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.id = data.id
    }

    get ListTemplate() {
        return /*html*/`
            <div class="col-4 p-4">
			    <div class="card">
				    <h5>Bedrooms:${this.bedrooms} Bathrooms:${this.bathrooms}</h5>
				    <h6>$${this.price}</h6>
				    <img
					    src="${this.imgUrl}"
					    alt="Picture of home"
				    />
				    <div class="d-flex justify-content-between">
					    <button
						    onclick="app.homeController.setActiveHome('${this.id}')"
						    class="btn btn-primary"
						    data-bs-toggle="modal"
						    data-bs-target="#details"
						    >
							    See Details
					    </button>
						<button
                            onclick="app.homeController.editHomeModal('${this.id}')"
							class="btn btn-warning"
							data-bs-toggle="modal"
							data-bs-target="#details"
						>
							Edit Home
						</button>
						<button
							onclick="app.homeController.deleteHomeById('${this.id}')"
							title="Delete home"
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
                    ${this.price}/ ${this.bedrooms}Bedrooms - ${this.bathrooms}Bathrooms - $${this.price}
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
                alt="Picture of home"
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

    get EditHomeDetailsTemplate() {
        return /*html*/ `
            <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel">
                Edit Home Details
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <form onsubmit="app.homeController.editHomeById('${this.id}')">
                    <div class="form-floating mb-3">
                        <input
                        required
                        type="number"
                        minlength="1"
                        class="form-control"
                        id="bedrooms"
                        placeholder="Number of Bedrooms"
                        name="bedrooms"
                        value="${this.bedrooms}"
                        />
                        <label for="home-bedrooms">Bedrooms</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="number"
                            class="form-control"
                            id="home-bathrooms"
                            placeholder="Number of Bathrooms"
                            name="bathrooms"
                            value="${this.bathrooms}"
                        />
                        <label for="home-bathrooms">Bathrooms</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="number"
                            class="form-control"
                            id="home-levels"
                            placeholder="Number of Levels"
                            name="levels"
                            value="${this.levels}"
                        />
                        <label for="home-levels">Levels</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="url"
                            class="form-control"
                            id="home-img"
                            placeholder="Home Image"
                            name="imgUrl"
                            value="${this.imgUrl}"
                        />
                        <label for="home-img">Image</label>
                    </div>
                    <div class="form-floating mb-3">
                    <input
                        required
                        type="number"
                        class="form-control"
                        id="home-year"
                        placeholder="Home Year"
                        name="year"
                        value="${this.year}"
                    />
                    <label for="home-year">Year</label>
                </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="number"
                            class="form-control"
                            id="home-price"
                            placeholder="Home Price"
                            name="price"
                            value="${this.price}"
                        />
                        <label for="home-price">Price</label>
                    </div>
                    <div class="form-floating">
                        <textarea
                            class="form-control"
                            placeholder="Leave a description here"
                            id="home-description"
                            name="description"
                        >${this.description}</textarea
                        >
                        <label for="home-description"
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
    get AddHomeTemplate() {
        return /*html*/ `
        <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">
                Add Home
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
    <div class="modal-body">
        <form onsubmit="app.homeController.createHome()">
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    minlength="3"
                    class="form-control"
                    id="home-bedrooms"
                    placeholder="Number of bedrooms"
                    name="bedrooms"
                    value="bedrooms"
                />
                <label for="home-bedrooms">Bedrooms</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="home-bathrooms"
                    placeholder="Number of Bathrooms"
                    name="bathrooms"
                    value="bathrooms"
                />
                <label for="home-bathrooms">Bathrooms</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="home-levels"
                    placeholder="Number of Levels"
                    name="levels"
                    value="levels"
                />
                <label for="home-levels">Levels</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="url"
                    class="form-control"
                    id="home-img"
                    placeholder="Home Image"
                    name="imgUrl"
                    value="imgUrl"
                />
                <label for="home-img">Image</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="home-year"
                    placeholder="Home Year"
                    name="year"
                />
                <label for="home-year">Year</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="home-price"
                    placeholder="Home Price"
                    name="price"
                />
                <label for="home-price">Price</label>
            </div>
            <div class="form-floating">
                <textarea
                    class="form-control"
                    placeholder="Leave a description here"
                    id="home-description"
                    name="description"
                >Description</textarea
                >
                <label for="home-description"
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

