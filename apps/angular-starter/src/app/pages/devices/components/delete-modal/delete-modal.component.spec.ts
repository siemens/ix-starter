import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IxActiveModal } from '@siemens/ix-angular/standalone';
import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
    let component: DeleteModalComponent;
    let fixture: ComponentFixture<DeleteModalComponent>;
    let mockActiveModal: jasmine.SpyObj<IxActiveModal>;

    beforeEach(async () => {
        const activeModalSpy = jasmine.createSpyObj('IxActiveModal', ['close', 'dismiss']);

        await TestBed.configureTestingModule({
            imports: [
                DeleteModalComponent,
                TranslateModule.forRoot(),
            ],
            providers: [
                { provide: IxActiveModal, useValue: activeModalSpy },
                TranslateService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DeleteModalComponent);
        component = fixture.componentInstance;
        mockActiveModal = TestBed.inject(IxActiveModal) as jasmine.SpyObj<IxActiveModal>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close modal with deleted: true when close() is called', () => {
        component.close();
        expect(mockActiveModal.close).toHaveBeenCalledWith({ deleted: true });
    });

    it('should dismiss modal with deleted: false when dismiss() is called', () => {
        component.dismiss();
        expect(mockActiveModal.dismiss).toHaveBeenCalledWith({ deleted: false });
    });

    it('should display translated title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const titleElement = compiled.querySelector('ix-modal-header');
        expect(titleElement).toBeTruthy();
        expect(titleElement?.getAttribute('icon')).toBe('trashcan');
        expect(titleElement?.getAttribute('icon-color')).toBe('color-alarm');
    });

    it('should display translated content', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const contentElement = compiled.querySelector('ix-modal-content');
        expect(contentElement).toBeTruthy();
    });

    it('should have cancel and delete buttons', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const buttons = compiled.querySelectorAll('ix-button');
        expect(buttons.length).toBe(2);

        const cancelButton = buttons[0];
        const deleteButton = buttons[1];

        expect(cancelButton.getAttribute('variant')).toBe('secondary');
        expect(cancelButton.hasAttribute('outline')).toBe(true);
        expect(deleteButton.getAttribute('variant')).toBe('danger');
    });
});
