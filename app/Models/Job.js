export class Job {
    constructor(data) {
        this.jobTitle = data.jobTitle
        this.company = data.company
        this.rate = data.rate
        this.hours = data.hours
        this.description = data.description
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.id = data.id
    }
    get ListTemplate() {
        return /*html*/`
            <div class="col-4 p-4">
			    <div class="card">
				    <h5>Job Title: ${this.jobTitle} Pay: ${this.rate} Hours: ${this.hours}</h5>
				    <h6>Company:${this.company}</h6>
				    <div class="d-flex justify-content-between">
					    <button
						    onclick="app.jobController.setActiveJob('${this.id}')"
						    class="btn btn-primary"
						    data-bs-toggle="modal"
						    data-bs-target="#details"
						    >
							    See Details
					    </button>
						<button
                            onclick="app.jobController.editJobModal('${this.id}')"
							class="btn btn-warning"
							data-bs-toggle="modal"
							data-bs-target="#details"
						>
							Edit Job
						</button>
						<button
							onclick="app.jobController.deleteJobById('${this.id}')"
							title="Delete job"
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
                    Job Title:${this.jobTitle} Pay${this.rate} Hours:${this.hours}
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
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

    get EditJobDetailsTemplate() {
        return /*html*/ `
            <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel">
                Edit Job Details
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <form onsubmit="app.jobController.editJobById('${this.id}')">
                    <div class="form-floating mb-3">
                        <input
                        required
                        type="text"
                        minlength="3"
                        class="form-control"
                        id="jobTitle"
                        placeholder="Job Title"
                        name="jobTitle"
                        value="${this.jobTitle}"
                        />
                        <label for="job-jobTitle">Job Title</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="text"
                            class="form-control"
                            id="job-company"
                            placeholder="Company Name"
                            name="company"
                            value="${this.company}"
                        />
                        <label for="job-company">Company</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            required
                            type="number"
                            class="form-control"
                            id="job-rate"
                            placeholder="Rate of Pay"
                            name="rate"
                            value="${this.rate}"
                        />
                        <label for="job-rate">Rate</label>
                    </div>
                    <div class="form-floating mb-3">
                    <input
                        required
                        type="number"
                        class="form-control"
                        id="job-hours"
                        placeholder="Job Hours"
                        name="hours"
                        value="${this.hours}"
                    />
                    <label for="job-hours">Hours</label>
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

    get AddJobTemplate() {
        return /*html*/ `
        <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">
                Add Job
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
                    type="text"
                    minlength="3"
                    class="form-control"
                    id="job-jobTitle"
                    placeholder="Job Title"
                    name="jobTitle"
                    value="jobTitle"
                />
                <label for="job-jobTitle">Job Title</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="text"
                    class="form-control"
                    id="job-company"
                    placeholder="Company"
                    name="company"
                    value="company"
                />
                <label for="job-company">Company</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="job-rate"
                    placeholder="Rate of Pay"
                    name="rate"
                    value="rate"
                />
                <label for="job-rate">Rate</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    required
                    type="number"
                    class="form-control"
                    id="job-hours"
                    placeholder="Job Hours"
                    name="hours"
                />
                <label for="job-hours">Hours</label>
            </div>
            <div class="form-floating">
                <textarea
                    class="form-control"
                    placeholder="Leave a description here"
                    id="job-description"
                    name="description">Description</textarea>
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