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
  ViewEncapsulation
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BooleanFieldValue, MdError} from '@angular/material/core';
import {MdRippleModule} from '@angular/material';
import {Observable} from 'rxjs/Observable';

const noop = () => {};

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
    //'[class.md-right]': 'align == "end"',
    '[class.cdb-option]': 'true',
    'md-ripple':'',
    '(click)':'_handleClick()',
  },
  template: '<li md-ripple [md-ripple-color]="black"><ng-content></ng-content></li>',
})
export class CdbOption {
  private _value: any = '';
  
  @Output() onSelect = new EventEmitter<boolean>();

  _handleClick() {
    this.onSelect.emit(this._value);
  }

  get value(): any { return this._value; };

  @Input() set value(v: any) {
    console.log("@CdbOption() set value");
    if (v !== this._value) {
      this._value = v;
    }
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
  providers: [CDB_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None 
})
export class CdbSelect implements ControlValueAccessor/*, AfterContentInit, OnChanges*/ {
  private _focused: boolean = false;
  private _value: any = '';

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
 // private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  /**
   * Content directives.
   */
  @ContentChildren(CdbOption) _optionChildren: QueryList<CdbOption>;


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
 /* get focused() { return this._focused; }
  get empty() { return (this._value == null || this._value === '') && this.type !== 'date'; }
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

  @Output('blur')
  get onBlur(): Observable<FocusEvent> {
    return this._blurEmitter.asObservable();
  }

  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }
*/

  get value(): any { return this._value; };
  @Input() set value(v: any) {
    console.log("@Input() set value");
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }


  // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
  // might place it as RTL when we don't want to. We still want to use `align` as an
  // Input though, so we use HostBinding.
 /* @HostBinding('attr.align') get _align(): any { return null; }


  @ViewChild('input') _inputElement: ElementRef;
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
  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    //this._onTouchedCallback();
  }

  onSelect(v: any) {
    console.log(v);
  
    //this._onTouchedCallback();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this._value = value;
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
 /* ngAfterContentInit() {
    this._validateConstraints();

  }*/

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