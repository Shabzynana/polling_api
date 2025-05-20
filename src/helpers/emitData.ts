import { emitSocketEvent } from "../middleware/io";

export function startPollBroadcast(pollService: any) {
  setInterval(async () => {
    try {
      const results  = await pollService.getallPollresults();
      emitSocketEvent('allVote_updated', null, results);
      console.log('Poll results emitted to users');
    } catch (error) {
      console.error('Error broadcasting poll results:', error);
    }
  }, 60000);
}
