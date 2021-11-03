import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, switchMap, tap} from "rxjs/operators";
import {IAddTask} from "../interface";


interface IObj {
  [key: string]: any
}

@Injectable({providedIn: "root"})


export class TodoService {
  constructor(private http: HttpClient) {
  }
  getAllFolder() {
    return this.http.get(`${environment.fbDbUrl}/state/-MUyH1ivSSpPZLlKv1yw.json`)
      .pipe(
        map((response:IObj) => {
          return Object.keys(response).map((item) => {
            return {
              tasks: response[item]?.tasks && Object.keys(response[item].tasks).map(name => {
                return {
                  name,
                  completed: response[item].tasks[name]
                }
              }),
              folder: response[item].name,
              color: response[item].color,
              id: item
            }
          })
        }),
        tap((response) => {
          console.log('rab', response)
          localStorage.setItem('state', JSON.stringify(response))
        })

      )
  }
  addFolder(folder: object) {
    return this.http.post(`${environment.fbDbUrl}/state/-MUyH1ivSSpPZLlKv1yw.json`, folder)
  }
  addTask(addTask:IAddTask) {
    return this.http.patch(`${environment.fbDbUrl}/state/-MUyH1ivSSpPZLlKv1yw/${addTask.folder}/tasks.json`, {[addTask.taskText]: addTask.completed})
  }
  completeTask(addTask: IAddTask) {
    return this.http.patch(`${environment.fbDbUrl}/state/-MUyH1ivSSpPZLlKv1yw/${addTask.folder}/tasks.json`,{[addTask.taskText]: addTask.completed})
      .pipe(switchMap(() => {
        return this.getAllFolder()
      }))
  }
  deleteTask(task: string, folder: string) {
    return this.http.delete(`${environment.fbDbUrl}/state/-MUyH1ivSSpPZLlKv1yw/${folder}/tasks/${task}.json`)
      .pipe(switchMap(() => {
        return this.getAllFolder()
      }))
  }
}
