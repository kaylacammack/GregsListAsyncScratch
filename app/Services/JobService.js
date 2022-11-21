import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";

class JobService {
    async getJobs() {
        const response = await axios.get('https://bcw-sandbox.herokuapp.com/api/jobs')
        appState.jobs = response.data.map(job => new Job(job))
    }
    
    setActiveJob(jobId = '') {
        let foundJob = appState.jobs.find(job => job.id === jobId)
        appState.activeJob = foundJob;
    }
    
    async editJobById(jobId = '', jobData) {
        await axios.put('https://bcw-sandbox.herokuapp.com/api/jobs/' + jobId, jobData)
        this.getJobs()
    }
    async createJob(jobData) {
        await axios.post('https://bcw-sandbox.herokuapp.com/api/jobs', jobData)
        this.getJobs()
    }
    async deleteJobById(jobId = '') {
        await axios.delete('https://bcw-sandbox.herokuapp.com/api/jobs/' + jobId)
        this.getJobs()
    }
}

export const jobService = new JobService()