import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobService } from "../Services/JobService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js"

export class JobController {
    // Private class variables. Made private by using # in front of the variable name
    #jobsArray = [new Job(appState.jobs)]
    #activeJob = Job
    constructor() {
        // Event listeners. Used to set private class variables when there is a change on the appState 
        appState.on('jobs', () => this.#jobsArray = appState.jobs)
        appState.on('activeJob', () => this.#activeJob = appState.activeJob)
        // Event listener to draw all cars when the cars array detects a change
        appState.on('jobs', () => _drawJobs(this.#jobsArray))
    }
    createJobModal() {
        _drawCreateJobForm(new Job(this.#activeJob))
    }
    editJobModal(jobId = '') {
        _setActiveJob(jobId)
        _drawEditForm(this.#activeJob)
    }
    setActiveJob(jobId = '') {
        _setActiveJob(jobId)
        _drawActiveJob(this.#activeJob)
    }

    // Public functions to request data. Calls the Private function that makes a request to the service
    async getJobs() {
        try {
            await _getJobs()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async createJob() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const jobData = getFormData(form)
            await _createJob(jobData)
            Pop.toast('Created', 'success')
            form.reset()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async editJobById(jobId = '') {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const jobData = getFormData(form)
            await _editJobById(jobId, jobData)
            Pop.toast('edited', 'info')
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async deleteJobById(jobId = '') {
        try {
            if (await Pop.confirm('Are you sure?', 'Someone spent a lot of time browsing the internet for that perfect picture', 'yeah toss it', 'warning')) {
                await _deleteJobById(jobId)
            }
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
}

// Private functions that make calls to the service
function _setActiveJob(jobId = '') {
    jobService.setActiveJob(jobId)
}

async function _getJobs() {
    await jobService.getJobs()
}
async function _createJob(jobData = new Job()) {
    await jobService.createJob(jobData)
}
async function _editJobById(jobId = '', jobData = new Job()) {
    await jobService.editJobById(jobId, jobData)
}
async function _deleteJobById(jobId = '') {
    await jobService.deleteJobById(jobId)
}

// Private functions to draw html to the page
function _drawJobs(jobs = [new Job()]) {
    const addJobButton ='<button class="btn btn-primary me-3 sticky-top" style="top:71px" data-bs-toggle="modal" data-bs-target="#details" onclick="app.jobController.createJobModal()">Add Job</button>'
    let template = ''
    jobs.forEach(job => template += job.ListTemplate)
    setHTML('listings', addJobButton + template)
}
function _drawCreateJobForm(job = new Job()) {
    setHTML('detailsModal', job.AddJobTemplate)
}
function _drawEditForm(job = new Job()) {
    setHTML('detailsModal', job.EditJobDetailsTemplate)
}
function _drawActiveJob(job = new Job()) {
    setHTML('detailsModal', job.DetailsTemplate)
}
