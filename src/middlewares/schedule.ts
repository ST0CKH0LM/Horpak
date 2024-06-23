import schedule , { Job } from 'node-schedule';

const jobs = new Map<string, Job>();

export const scheduleNotification = (id : string , date : Date , callback: () => void) : void => {
    if (jobs.has(id)) {
        console.log("Notification id already exist")
        const existingJob = jobs.get(id);
        if (existingJob) {
            existingJob.cancel();
            jobs.delete(id);
        }
    }
    const job = schedule.scheduleJob(id , date , callback);
    jobs.set(id,job);
}

export const cancelScheduleNotification = (id : string): void => {
    if (jobs.has(id)) {
        const job =jobs.get(id);
        if (job) {
            job.cancel();
            jobs.delete(id);
        }
    }
}