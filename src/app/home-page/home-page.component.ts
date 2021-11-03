import {Component, OnInit} from "@angular/core";
import {TodoService} from "../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap, tap} from "rxjs/operators";
import {bindCallback} from "rxjs";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{
  folderColor: string[] = ["yellow", "pink", "red", "green", "purple", "blue", "grey"]

  showAddFolder: boolean = false
  currentColor: string = ''
  nameFolder: string = ''
  filteredFolders: [] = []

  constructor(
    private todoS: TodoService,
    private route: ActivatedRoute
  ) {
  }
  //ts-ignore
  array: any
  resl: any


  addFolder() {
    this.todoS.addFolder({name: this.nameFolder ,color: this.currentColor, tasks: []})
      .pipe(switchMap(() => this.todoS.getAllFolder())).subscribe((resp) => {
      this.array = resp
    })

  }
  addTask() {
    // this.todoS.addTask()
  }
  ngOnInit(): void {
    this.todoS.getAllFolder().subscribe((response:any) => {
      this.array = response
      // console.log(response)
      // this.array = Object.keys(response).map((item) => {
      //   return {
      //     tasks: response[item]?.tasks && Object.keys(response[item].tasks).map(name => {
      //       return {
      //         name,
      //         completed: response[item].tasks[name]
      //       }
      //     }),
      //     folder: response[item].name,
      //     color: response[item].color,
      //     id: item
      //   }
      // })
      // console.log(this.array)
    })
  }


  addFolderHandler() {
    this.showAddFolder = !this.showAddFolder
  }

  addColorFolder(color: string) {
    this.currentColor = color
  }

  filterFolders(nameFolder: string) {
    if (nameFolder === 'all') {
      this.filteredFolders = this.array
      return
    }
    // @ts-ignore
    this.filteredFolders = this.array.filter((obj: any) => {
      return obj?.id === nameFolder
    })
    console.log(this.filteredFolders)
  }

  update() {
    const callback  = bindCallback(
      (resp: any) => {
        this.filterFolders(resp[0].id)
        console.log(resp)
      }
    )
    const b = this

    // @ts-ignore
    this.todoS.getAllFolder()
      // @ts-ignore
      .subscribe((resp: any) =>callback(resp)
    )
  }
}
