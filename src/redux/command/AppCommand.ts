import {Command} from "redux-commands";
import {AppStore} from "../AppStore";

export abstract class AppCommand extends Command<AppStore> {

}