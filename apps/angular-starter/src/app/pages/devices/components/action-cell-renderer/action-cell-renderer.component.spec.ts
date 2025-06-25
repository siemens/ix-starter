import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCellRendererComponent } from './action-cell-renderer.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('ActionCellRendererComponent', () => {
  let component: ActionCellRendererComponent;
  let fixture: ComponentFixture<ActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionCellRendererComponent, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        TranslateStore
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionCellRendererComponent);
    component = fixture.componentInstance;

    component.params = {
      data: { status: 'Online' },
      node: { id: 1, rowIndex: 0 },
      api: {
        getColumnDefs: () => [{ field: 'name' }],
        getRowNode: () => ({ rowIndex: 0 }),
        startEditingCell: () => { },
        setFocusedCell: () => { },
        refreshCells: () => { }
      },
      onDelete: () => { },
      onDuplicate: () => { },
      onPaste: () => { },
      onChangeStatus: () => { }
    };
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
