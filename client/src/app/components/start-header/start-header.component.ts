import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-header',
  templateUrl: './start-header.component.html',
  styleUrls: ['./start-header.component.less']
})
export class StartHeaderComponent  {
  @Input() isLogout: boolean;
}
