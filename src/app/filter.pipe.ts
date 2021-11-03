import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform{
  transform(array: Array<any>, activeFolder: string): any {
    if(activeFolder === 'all') {
      return array
    }
    return array.filter(folder => {
      return folder.id === activeFolder
    })
  }
}
