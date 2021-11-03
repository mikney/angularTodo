import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TodoService} from "../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IAddTask} from "../interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{



  @Input('folders') obj: any = [{}]
  @Input() fn: any
  activeFolder: string = ''
  taskText: string = ''
  @Output() result: EventEmitter<any> = new EventEmitter()

  state: any[] = JSON.parse(<string>localStorage.getItem('state'))

  constructor(
    private todoS: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.activeFolder = params.id
      console.log(params.id)
    })
  }

  test(name: string) {
    const addTask: IAddTask = {taskText: name, completed: true, folder: this.activeFolder}
    this.todoS.completeTask(addTask).subscribe((response) => {
      this.state = response
    })
  }

  addTask() {
    // this.activeFolder = this.obj.length > 1 ? '' : this.obj[0].id
    console.log(this.activeFolder)
    const addTask: IAddTask = {folder: this.activeFolder, taskText: this.taskText, completed: false}
    this.taskText = ''
    this.todoS.addTask(addTask)
      .pipe(
        tap(() => {

        })
      )
      .subscribe(() => {
        this.router.navigate(['/folder', this.activeFolder])
        this.todoS.getAllFolder().subscribe(() => {
          this.state = JSON.parse(<string>localStorage.getItem('state'))
        })
      })
    this.result.emit('hi')
  }

  deleteTask(taskName: string) {
    this.todoS.deleteTask(taskName, this.activeFolder,).subscribe((response) => {
      this.state = response
    })
  }
}
