import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Quill from 'quill';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('editorRef') editorRef: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const quill = new Quill(this.editorRef.nativeElement);
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      'wss://y-websocket-service.vercel.app',
      'room-1',
      ydoc
    );
    const ytext = ydoc.getText('note-1');
    const binding = new QuillBinding(ytext, quill, provider.awareness);
  }
}
