import { Middleware } from "./Middleware";
export class Logger extends Middleware {
    previousState = null;
    onBeforeUpdate(_, state) {
        this.previousState = state;
    }
    onUpdate(name, state) {
        console.log("%cMutation:", "color: rgb(187, 186, 186); font-weight: bold", name, "@", this.time);
        console.log("   %cPrevious State", "color: #26ad65; font-weight: bold", this.previousState);
        console.log("   %cNext State    ", "color: rgb(17, 118, 249); font-weight: bold", state);
        this.previousState = null;
    }
    /**
     * Time
     *
     * Returns the time in which a given state transition completed
     */
    get time() {
        const date = new Date();
        const mHours = date.getHours();
        const hours = mHours > 12 ? mHours - 12 : mHours;
        const mins = date.getMinutes();
        const minutes = mins.toString().length === 1 ? `0${mins}` : mins;
        const secs = date.getSeconds();
        const seconds = secs.toString().length === 1 ? `0${secs}` : secs;
        const milliseconds = date.getMilliseconds();
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
}
