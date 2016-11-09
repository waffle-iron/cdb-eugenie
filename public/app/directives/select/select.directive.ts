import {
  forwardRef,
  Component,
  HostBinding,
  Input,
  Directive,
  AfterContentInit,
  ContentChild,
  SimpleChange,
  ContentChildren,
  ViewChild,
  ElementRef,
  QueryList,
  OnChanges,
  EventEmitter,
  Output,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation,
  Renderer,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { BooleanFieldValue, MdError } from '@angular/material/core';
import { MdRippleModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';

const noop = () => { };

export const CDB_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CdbSelect),
  multi: true,
};

const MD_INPUT_INVALID_INPUT_TYPE = [
  'file',
  'radio',
  'checkbox',
];


let nextUniqueId = 0;

/** A simple change event emitted on selection changes. */
export class CdbOptionSelectEvent {
  index: number;
  option: CdbOption;
}

/** The hint directive, used to tag content as hint labels (going under the input). */
@Component({
  moduleId: module.id,
  selector: 'cdb-option',
  host: {
    '[class.cdb-option]': 'true',
    'md-ripple': '',
    '(click)': 'select()',
  },
  template: '<li md-ripple [md-ripple-color]="black"><ng-content></ng-content></li>',
})
export class CdbOption {

  constructor(private _element: ElementRef, private _renderer: Renderer) { }

  private _value: any = '';

  @Output() onSelect = new EventEmitter<any>();

  select() {
    this.onSelect.emit();
  }

  get value(): any { return this._value; };

  @Input() set value(v: any) {
    console.log("@CdbOption() set value");
    if (v !== this._value) {
      this._value = v;
    }
  }

  get viewValue(): string {
    return this._getHostElement().textContent.trim();
  }

  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}


/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
@Component({
  moduleId: module.id,
  selector: 'cdb-select',
  templateUrl: 'select.directive.html',
  styleUrls: ['select.directive.css'],
  animations: [
    transformPlaceholder,
    transformPanel,
    fadeInContent
  ],
  providers: [CDB_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class CdbSelect implements ControlValueAccessor, AfterContentInit/*, OnChanges*/ {
  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  private _focused: boolean = false;

  /** The currently selected option. */
  private _selected: CdbOption;

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  // private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  /** Subscriptions to option events. */
  private _subscriptions: Subscription[] = [];


  /** This position config ensures that the top left corner of the overlay
   * is aligned with with the top left of the origin (overlapping the trigger
   * completely). In RTL mode, the top right corners are aligned instead.
   */
  _positions = [{
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top'
  }];

  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('input') _inputElement: ElementRef;

  /**
   * Content directives.
   */
  @ContentChildren(CdbOption) _optionChildren: QueryList<CdbOption>;

  /** The currently selected option. */
  get selected(): CdbOption {
    return this._selected;
  }

  /**
   * Aria related inputs.
   */
  /* @Input('aria-label') ariaLabel: string;
   @Input('aria-labelledby') ariaLabelledBy: string;
   @Input('aria-disabled') @BooleanFieldValue() ariaDisabled: boolean;
   @Input('aria-required') @BooleanFieldValue() ariaRequired: boolean;
   @Input('aria-invalid') @BooleanFieldValue() ariaInvalid: boolean;
 */

  /** Readonly properties. */
  get focused() { return this._focused; }
  /* get empty() { return (this._value == null || this._value === '') && this.type !== 'date'; }
   get characterCount(): number {
     return this.empty ? 0 : ('' + this._value).length;
   }
   get inputId(): string { return `${this.id}-input`; }
 */
  /**
   * Bindings.
   */
  @Input() placeholder: string = null;
  /* @Input() align: 'start' | 'end' = 'start';
   @Input() dividerColor: 'primary' | 'accent' | 'warn' = 'primary';
   @Input() @BooleanFieldValue() floatingPlaceholder: boolean = true;
   @Input() hintLabel: string = '';
 
   @Input() autocomplete: string;
   @Input() autocorrect: string;
   @Input() autocapitalize: string;
   @Input() @BooleanFieldValue() autofocus: boolean = false;
   @Input() @BooleanFieldValue() disabled: boolean = false;
   @Input() id: string = `md-input-${nextUniqueId++}`;
   @Input() list: string = null;
   @Input() max: string | number = null;
   @Input() maxlength: number = null;
   @Input() min: string | number = null;
   @Input() minlength: number = null;
   @Input() placeholder: string = null;
   @Input() @BooleanFieldValue() readonly: boolean = false;
   @Input() @BooleanFieldValue() required: boolean = false;
   @Input() @BooleanFieldValue() spellcheck: boolean = false;
   @Input() step: number = null;
   @Input() tabindex: number = null;
   @Input() type: string = 'text';
   @Input() name: string = null;
 
   private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
   private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
 */
  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  _handleFocus(event: FocusEvent): void {
    this._focused = true;
    this.toggle();
    //this.focus();
  }

  /** Set focus on input */
  focus() {
    this._inputElement.nativeElement.focus();
  }

  _handleBlur(event: FocusEvent) {
    this._focused = false;
    // this.toggle();
  }

  /** The width of the trigger element. This is necessary to match
   * the overlay width to the trigger width.
   */
  _getWidth(): number {
    return this.trigger.nativeElement.getBoundingClientRect().width;
  }

  /** Opens the overlay panel. */
  open(): void {
    this._panelOpen = true;
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
  }

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean {
    return this._panelOpen;
  }
  /*
    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
      return this._blurEmitter.asObservable();
    }
  
    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
      return this._focusEmitter.asObservable();
    }
  */

  get value(): any { return this._selected.value; };


  // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
  // might place it as RTL when we don't want to. We still want to use `align` as an
  // Input though, so we use HostBinding.
  /* @HostBinding('attr.align') get _align(): any { return null; }*/




  /*
    /** Set focus on input */
  /* focus() {
     this._inputElement.nativeElement.focus();
   }
 
   _handleFocus(event: FocusEvent) {
     this._focused = true;
     this._focusEmitter.emit(event);
   }
 
   _handleBlur(event: FocusEvent) {
     this._focused = false;
     this._onTouchedCallback();
     this._blurEmitter.emit(event);
   }
 */


  /** Listens to selection events on each option. */
  private _listenToOptions(): void {
    this._optionChildren.forEach((option: CdbOption) => {
      const sub = option.onSelect.subscribe(() => {
        this._onSelect(option);
        this._subscriptions.push(sub);
      });
    });
  }

  private _onSelect(option: CdbOption) {
    this._selected = option;
    //this.focus();
    this.close();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    console.log("test writeValue", value)
    if (!this._optionChildren) { return; }

    this._optionChildren.forEach((option: CdbOption) => {
      console.log("test writeValue loop", value, option.value)
      if (option.value == value) {
        console.log("===", value, option.value)
        option.select();
      }
    });
  }


  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    // this._onTouchedCallback = fn;
  }

  private _validateConstraints() {
    if (this._optionChildren) {

      this._optionChildren.forEach((option: CdbOption) => {

      });
    }
  }
  /** TODO: internal */
  ngAfterContentInit() {
    this._listenToOptions();

  }

  ngOnDestroy() {
    this._dropSubscriptions();
  }

  /** Unsubscribes from all option subscriptions. */
  private _dropSubscriptions(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this._subscriptions = [];
  }

  /** TODO: internal */
  /*ngOnChanges(changes: {[key: string]: SimpleChange}) {
    this._validateConstraints();
  }*/

  /**
   * Convert the value passed in to a value that is expected from the type of the md-input.
   * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
   * on our internal input it won't work locally.
   * @private
   */
  /* private _convertValueForInputType(v: any): any {
     switch (this.type) {
       case 'number': return parseFloat(v);
       default: return v;
     }
   }
 */
  /**
   * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
   * Constraints for now:
   *   - placeholder attribute and <md-placeholder> are mutually exclusive.
   *   - type attribute is not one of the forbidden types (see constant at the top).
   *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
   *     considered as align="start".
   * @private
   */
  /*  private _validateConstraints() {
  
      if (MD_INPUT_INVALID_INPUT_TYPE.indexOf(this.type) != -1) {
        throw new MdInputUnsupportedTypeError(this.type);
      }
  
  
    }*/

  /**
    * When the panel is finished animating, emits an event and focuses
    * an option if the panel is open.
    */
  _onPanelDone(): void {
    console.log("done");
    if (this.panelOpen) {
      //this._focusCorrectOption();
      //this.onOpen.emit();
    } else {
      //this.onClose.emit();
    }
  }

}

@NgModule({
  declarations: [CdbSelect, CdbOption],
  imports: [CommonModule, FormsModule, MdRippleModule],
  exports: [CdbSelect, CdbOption],
})
export class CdbSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CdbSelectModule,
      providers: []
    };
  }
}