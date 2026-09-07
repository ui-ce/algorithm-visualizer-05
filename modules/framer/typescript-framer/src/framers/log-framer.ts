import { IFramer } from '../models/framer/i-framer.interface';
import { FrameState } from '../models/framer/frame-state.type';
import { Log } from '../models/framer/log/log.type';
import { LogAction } from '../models/recorder/log/log-action.enum';
import { LogSetMessageParams } from '../models/recorder/log/log-set-message-params.type';
import { LogState } from '../models/framer/log/log-state.type';
import { LogInitParams } from '../models/recorder/log/log-init-params.type';

export class LogFramer implements IFramer {
  private _id: string;
  private _log: Log;

  public initialize(id: string, param: LogInitParams): void {
    this._id = id;
    this._log = {
      name: param.name,
      title: null,
      message: param.message ?? null,
      line: null,
    };
  }

  public applyAction(action: string, param: unknown): void {
    switch(action) {
      case LogAction.SET_MESSAGE:
        this.setMessage(param as LogSetMessageParams);
        break;
      case LogAction.CLEAR_MESSAGE:
        this.clearMessage();
        break;
      default:
        throw new Error(`Unknown LogAction: ${action}`);
    }
  }

  private setMessage({ title, message, line }: LogSetMessageParams): void {
    this._log.title = title ?? null;
    this._log.message = message;
    this._log.line = line ?? null;
  }

  private clearMessage(): void {
    this._log.title = null;
    this._log.message = null;
    this._log.line = null;
  }

  public getFrameState(): FrameState<LogState> {
    return {
      id: this._id,
      type: 'Log',
      state: this._log,
    };
  }
}
