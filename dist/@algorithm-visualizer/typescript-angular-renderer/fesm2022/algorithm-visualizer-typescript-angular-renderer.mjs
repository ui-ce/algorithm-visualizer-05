import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, Component, Injectable, inject, ViewChild } from '@angular/core';
import * as i4 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i2 from 'primeng/knob';
import { KnobModule } from 'primeng/knob';
import * as i3 from 'primeng/slider';
import { SliderModule } from 'primeng/slider';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1$1 from 'primeng/card';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import cytoscape from 'cytoscape';

class WebPlayer {
    animationLength;
    frameIndex = 0;
    frameTime = 200;
    frameIndexChange = new EventEmitter();
    playing = false;
    _timer;
    ngOnDestroy() {
        this.stop();
    }
    play() {
        if (!this.animationLength) {
            return;
        }
        this.playing = true;
        this._timer = setInterval(() => this.next(), this.frameTime);
    }
    stop() {
        this.playing = false;
        if (this._timer) {
            clearInterval(this._timer);
        }
    }
    togglePlay() {
        if (this.playing) {
            this.stop();
            return;
        }
        this.play();
    }
    next() {
        this.frameIndex = Math.min(this.frameIndex + 1, this.animationLength - 1);
        this.frameIndexChange.emit(this.frameIndex);
        if (this.frameIndex === this.animationLength - 1) {
            this.stop();
        }
    }
    prev() {
        if (!this.animationLength) {
            return;
        }
        this.frameIndex = Math.max(this.frameIndex - 1, 0);
        this.frameIndexChange.emit(this.frameIndex);
    }
    first() {
        this.frameIndex = 0;
        this.frameIndexChange.emit(this.frameIndex);
    }
    last() {
        if (!this.animationLength) {
            return;
        }
        this.frameIndex = this.animationLength - 1;
        this.frameIndexChange.emit(this.frameIndex);
    }
    onFrameTimeChanged(frameTime) {
        this.frameTime = frameTime;
        if (!this.playing) {
            return;
        }
        clearInterval(this._timer);
        this._timer = setInterval(() => this.next(), this.frameTime);
    }
    onFrameIndexChanged(frameIndex) {
        this.frameIndex = frameIndex;
        this.frameIndexChange.emit(this.frameIndex);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebPlayer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: WebPlayer, isStandalone: true, selector: "web-player", inputs: { animationLength: "animationLength", frameIndex: "frameIndex", frameTime: "frameTime" }, outputs: { frameIndexChange: "frameIndexChange" }, ngImport: i0, template: "<div class=\"toolbar\">\r\n  <div class=\"player\">\r\n    <p-button [size]=\"'small'\" (click)=\"first()\" icon=\"pi pi-angle-double-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"prev()\" icon=\"pi pi-angle-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"togglePlay()\" [icon]=\"this.playing ? 'pi pi-spin pi-spinner' : 'pi pi-play'\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"next()\" icon=\"pi pi-angle-right\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"last()\" icon=\"pi pi-angle-double-right\"/>\r\n  </div>\r\n\r\n  <div class=\"frame-slider\">\r\n    <span>{{ frameIndex + 1 }} / {{ animationLength || 1 }}</span>\r\n    <p-slider [ngModel]=\"frameIndex\" (ngModelChange)=\"onFrameIndexChanged($event)\" [min]=\"0\" [max]=\"(animationLength ?? 1) - 1\" class=\"slider\"/>\r\n  </div>\r\n\r\n  <p-knob [ngModel]=\"frameTime\" (ngModelChange)=\"onFrameTimeChanged($event)\" [size]=\"65\" [min]=\"1\" [max]=\"1000\" valueTemplate=\"{value}ms\"/>\r\n</div>\r\n", styles: [".toolbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.toolbar .player{display:flex;flex-direction:row;align-items:center;gap:.25rem}.toolbar .frame-slider{position:absolute;left:50%;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;width:10rem;gap:.5rem;color:gray;font-weight:700}.toolbar .frame-slider .slider{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: KnobModule }, { kind: "component", type: i2.Knob, selector: "p-knob", inputs: ["styleClass", "ariaLabel", "ariaLabelledBy", "tabindex", "valueColor", "rangeColor", "textColor", "valueTemplate", "size", "min", "max", "step", "strokeWidth", "showValue", "readonly"], outputs: ["onChange"] }, { kind: "ngmodule", type: SliderModule }, { kind: "component", type: i3.Slider, selector: "p-slider", inputs: ["animate", "min", "max", "orientation", "step", "range", "styleClass", "ariaLabel", "ariaLabelledBy", "tabindex", "autofocus"], outputs: ["onChange", "onSlideEnd"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: i4.Button, selector: "p-button", inputs: ["hostName", "type", "badge", "disabled", "raised", "rounded", "text", "plain", "outlined", "link", "tabindex", "size", "variant", "style", "styleClass", "badgeClass", "badgeSeverity", "ariaLabel", "autofocus", "iconPos", "icon", "label", "loading", "loadingIcon", "severity", "buttonProps", "fluid"], outputs: ["onClick", "onFocus", "onBlur"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebPlayer, decorators: [{
            type: Component,
            args: [{ selector: 'web-player', imports: [FormsModule, KnobModule, SliderModule, ButtonModule], template: "<div class=\"toolbar\">\r\n  <div class=\"player\">\r\n    <p-button [size]=\"'small'\" (click)=\"first()\" icon=\"pi pi-angle-double-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"prev()\" icon=\"pi pi-angle-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"togglePlay()\" [icon]=\"this.playing ? 'pi pi-spin pi-spinner' : 'pi pi-play'\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"next()\" icon=\"pi pi-angle-right\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"last()\" icon=\"pi pi-angle-double-right\"/>\r\n  </div>\r\n\r\n  <div class=\"frame-slider\">\r\n    <span>{{ frameIndex + 1 }} / {{ animationLength || 1 }}</span>\r\n    <p-slider [ngModel]=\"frameIndex\" (ngModelChange)=\"onFrameIndexChanged($event)\" [min]=\"0\" [max]=\"(animationLength ?? 1) - 1\" class=\"slider\"/>\r\n  </div>\r\n\r\n  <p-knob [ngModel]=\"frameTime\" (ngModelChange)=\"onFrameTimeChanged($event)\" [size]=\"65\" [min]=\"1\" [max]=\"1000\" valueTemplate=\"{value}ms\"/>\r\n</div>\r\n", styles: [".toolbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.toolbar .player{display:flex;flex-direction:row;align-items:center;gap:.25rem}.toolbar .frame-slider{position:absolute;left:50%;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;width:10rem;gap:.5rem;color:gray;font-weight:700}.toolbar .frame-slider .slider{width:100%}\n"] }]
        }], propDecorators: { animationLength: [{
                type: Input
            }], frameIndex: [{
                type: Input
            }], frameTime: [{
                type: Input
            }], frameIndexChange: [{
                type: Output
            }] } });

// This library is published standalone and has no dependency on (or
// awareness of) the host app's LanguageService. Rather than introduce
// that coupling, this reads the one piece of global state the host app
// already sets when the person switches language: `<html lang="...">`
// (see LanguageService.applyLanguage in the web-examples app). That
// keeps every renderer component free to just call `toLocaleDigits()`
// wherever it prints a number, without importing anything app-specific.
//
// Only the digit *glyphs* are swapped — this deliberately does not
// touch layout, ordering, or the surrounding string's direction. Bars,
// indices, and array cells must stay left-to-right regardless of UI
// language; only how their numerals are drawn should change.
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function toLocaleDigits(value) {
    if (value === null || value === undefined) {
        return '';
    }
    const text = String(value);
    if (typeof document === 'undefined' || document.documentElement.lang !== 'fa') {
        return text;
    }
    return text.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

class Array2DHighlightLayer {
    colors;
    value;
    formatDigits(value) {
        return toLocaleDigits(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DHighlightLayer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: Array2DHighlightLayer, isStandalone: true, selector: "array-2d-highlight-layer", inputs: { colors: "colors", value: "value" }, ngImport: i0, template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <array-2d-highlight-layer [colors]=\"colors.slice(1)\" [value]=\"value\"></array-2d-highlight-layer>\r\n  } @else {\r\n    <span>{{ formatDigits(value) }}</span>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"], dependencies: [{ kind: "component", type: Array2DHighlightLayer, selector: "array-2d-highlight-layer", inputs: ["colors", "value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DHighlightLayer, decorators: [{
            type: Component,
            args: [{ selector: 'array-2d-highlight-layer', imports: [], template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <array-2d-highlight-layer [colors]=\"colors.slice(1)\" [value]=\"value\"></array-2d-highlight-layer>\r\n  } @else {\r\n    <span>{{ formatDigits(value) }}</span>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"] }]
        }], propDecorators: { colors: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

class Array2DRenderer {
    state;
    metadata;
    getMinHeight() {
        return this.metadata?.minHeight ?? '100px';
    }
    getDefaultColor() {
        return this.metadata?.defaultColor ?? 'white';
    }
    getCellSize() {
        return this.metadata?.cellSize ?? '50px';
    }
    getCellColors(cell) {
        return cell.highlightTags.map((tag) => {
            const highlight = this.metadata?.highlightTags?.find((h) => h.tag === tag);
            return highlight?.color ?? this.metadata?.defaultColor ?? 'white';
        });
    }
    formatDigits(value) {
        return toLocaleDigits(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: Array2DRenderer, isStandalone: true, selector: "array-2d-renderer", inputs: { state: "state", metadata: "metadata" }, ngImport: i0, template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title text-body-large-medium\">\r\n        {{ state?.name }}\r\n      </span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"table-container\">\r\n    <table class=\"array2d-table\">\r\n      @for (row of state?.values; track $index) {\r\n        <tr>\r\n          @for (cell of row; track $index) {\r\n            <td\r\n              [style.background-color]=\"getDefaultColor()\"\r\n              [style.width]=\"getCellSize()\"\r\n              [style.height]=\"getCellSize()\"\r\n            >\r\n              @let colors = getCellColors(cell);\r\n\r\n              @if (colors.length !== 0) {\r\n                <array-2d-highlight-layer\r\n                  [colors]=\"colors\"\r\n                  [value]=\"cell.value\"\r\n                />\r\n              } @else {\r\n                <span class=\"text-body-medium\">\r\n                  {{ formatDigits(cell.value) }}\r\n                </span>\r\n              }\r\n            </td>\r\n          }\r\n        </tr>\r\n      }\r\n    </table>\r\n  </div>\r\n</p-card>", styles: [":host{display:block;width:100%;height:100%}:host ::ng-deep .p-card{width:100%;height:100%;background:transparent;border:none;border-radius:0;box-shadow:none}:host ::ng-deep .p-card-header{padding:0;background:transparent}:host ::ng-deep .p-card-body{width:100%;height:100%;padding:0;background:transparent}:host ::ng-deep .p-card-content{width:100%;height:100%;padding:0;background:transparent}:host .header{display:flex;align-items:center;padding:8px 12px;background:transparent}:host .header .title{color:var(--color-text-secondary)}:host .table-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent}:host .array2d-table{direction:ltr;border-collapse:collapse}:host .array2d-table td{border:2px solid #ccc;text-align:center;vertical-align:middle;background:transparent}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: CardModule }, { kind: "component", type: i1$1.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: Array2DHighlightLayer, selector: "array-2d-highlight-layer", inputs: ["colors", "value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'array-2d-renderer', imports: [CommonModule, CardModule, FormsModule, TableModule, Array2DHighlightLayer], template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title text-body-large-medium\">\r\n        {{ state?.name }}\r\n      </span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"table-container\">\r\n    <table class=\"array2d-table\">\r\n      @for (row of state?.values; track $index) {\r\n        <tr>\r\n          @for (cell of row; track $index) {\r\n            <td\r\n              [style.background-color]=\"getDefaultColor()\"\r\n              [style.width]=\"getCellSize()\"\r\n              [style.height]=\"getCellSize()\"\r\n            >\r\n              @let colors = getCellColors(cell);\r\n\r\n              @if (colors.length !== 0) {\r\n                <array-2d-highlight-layer\r\n                  [colors]=\"colors\"\r\n                  [value]=\"cell.value\"\r\n                />\r\n              } @else {\r\n                <span class=\"text-body-medium\">\r\n                  {{ formatDigits(cell.value) }}\r\n                </span>\r\n              }\r\n            </td>\r\n          }\r\n        </tr>\r\n      }\r\n    </table>\r\n  </div>\r\n</p-card>", styles: [":host{display:block;width:100%;height:100%}:host ::ng-deep .p-card{width:100%;height:100%;background:transparent;border:none;border-radius:0;box-shadow:none}:host ::ng-deep .p-card-header{padding:0;background:transparent}:host ::ng-deep .p-card-body{width:100%;height:100%;padding:0;background:transparent}:host ::ng-deep .p-card-content{width:100%;height:100%;padding:0;background:transparent}:host .header{display:flex;align-items:center;padding:8px 12px;background:transparent}:host .header .title{color:var(--color-text-secondary)}:host .table-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent}:host .array2d-table{direction:ltr;border-collapse:collapse}:host .array2d-table td{border:2px solid #ccc;text-align:center;vertical-align:middle;background:transparent}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }] } });

class ChartHighlightLayer {
    colors;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartHighlightLayer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: ChartHighlightLayer, isStandalone: true, selector: "chart-highlight-layer", inputs: { colors: "colors" }, ngImport: i0, template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <chart-highlight-layer [colors]=\"colors.slice(1)\"></chart-highlight-layer>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"], dependencies: [{ kind: "component", type: ChartHighlightLayer, selector: "chart-highlight-layer", inputs: ["colors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartHighlightLayer, decorators: [{
            type: Component,
            args: [{ selector: 'chart-highlight-layer', imports: [Array2DHighlightLayer], template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <chart-highlight-layer [colors]=\"colors.slice(1)\"></chart-highlight-layer>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"] }]
        }], propDecorators: { colors: [{
                type: Input
            }] } });

class ChartRenderer {
    state;
    metadata;
    getBarColors(highlightTags) {
        return highlightTags.map((tag) => {
            const highlight = this.metadata?.highlightTags?.find((h) => h.tag === tag);
            return highlight?.color ?? this.metadata?.defaultColor ?? 'white';
        });
    }
    getBarHeight(value) {
        const max = Math.max(...this.state.bars.map((bar) => bar.value), 1);
        const percent = (value / max) * 100;
        return `max(2px, calc(${percent}% - 2rem))`;
    }
    getDefaultColor() {
        return this.metadata?.defaultColor ?? 'white';
    }
    getBarWidth() {
        return this.metadata?.barWidth ?? '40px';
    }
    getBarGap() {
        return this.metadata?.barGap ?? '10px';
    }
    getChartHeight() {
        return this.metadata?.chartHeight ?? '100%';
    }
    getShowLabel() {
        return this.metadata?.showLabel ?? true;
    }
    getShowValue() {
        return this.metadata?.showValue ?? true;
    }
    // Bar order/position stays left-to-right always (see chart-renderer.scss's
    // `direction: ltr` pin) — this only swaps how the digits themselves are
    // drawn (Persian numerals) when the page is in Persian.
    formatDigits(value) {
        return toLocaleDigits(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: ChartRenderer, isStandalone: true, selector: "chart-renderer", inputs: { state: "state", metadata: "metadata" }, ngImport: i0, template: "<div class=\"chart-renderer-root\">\r\n  <div class=\"chart\" [style.height]=\"getChartHeight()\" [style.gap]=\"getBarGap()\">\r\n    @for (bar of state?.bars; track $index) {\r\n      <div class=\"bar-container\" [style.width]=\"getBarWidth()\">\r\n        @if (getShowValue()) {\r\n          <div class=\"value\">{{ formatDigits(bar.value) }}</div>\r\n        }\r\n        <div class=\"bar\" [style.height]=\"getBarHeight(bar.value)\" [style.background-color]=\"getDefaultColor()\">\r\n          @let colors = getBarColors(bar.highlightTags);\r\n          @if (colors.length !== 0) {\r\n            <chart-highlight-layer [colors]=\"colors\"></chart-highlight-layer>\r\n          }\r\n        </div>\r\n        @if (getShowLabel()) {\r\n          <div class=\"label\">{{ formatDigits(bar.label) }}</div>\r\n        }\r\n      </div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;width:100%;height:100%}:host .chart-renderer-root{display:flex;flex-direction:column;width:100%;height:100%;min-height:0}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;flex-shrink:0;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}.chart{direction:ltr;display:flex;flex-direction:row;align-items:flex-end;justify-content:center;flex:1;min-height:0;width:100%}.chart .bar-container{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}.chart .bar-container .bar{display:flex;align-items:flex-end;justify-content:center;background:transparent;border-radius:4px;width:100%;overflow:hidden}.chart .bar-container .value{margin-top:.5rem;font-size:.9rem;text-align:center;color:var(--color-text-primary)}.chart .bar-container .label{margin-top:.5rem;font-size:.9rem;text-align:center;color:var(--color-text-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: ChartHighlightLayer, selector: "chart-highlight-layer", inputs: ["colors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'chart-renderer', imports: [CommonModule, FormsModule, TableModule, ChartHighlightLayer], template: "<div class=\"chart-renderer-root\">\r\n  <div class=\"chart\" [style.height]=\"getChartHeight()\" [style.gap]=\"getBarGap()\">\r\n    @for (bar of state?.bars; track $index) {\r\n      <div class=\"bar-container\" [style.width]=\"getBarWidth()\">\r\n        @if (getShowValue()) {\r\n          <div class=\"value\">{{ formatDigits(bar.value) }}</div>\r\n        }\r\n        <div class=\"bar\" [style.height]=\"getBarHeight(bar.value)\" [style.background-color]=\"getDefaultColor()\">\r\n          @let colors = getBarColors(bar.highlightTags);\r\n          @if (colors.length !== 0) {\r\n            <chart-highlight-layer [colors]=\"colors\"></chart-highlight-layer>\r\n          }\r\n        </div>\r\n        @if (getShowLabel()) {\r\n          <div class=\"label\">{{ formatDigits(bar.label) }}</div>\r\n        }\r\n      </div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;width:100%;height:100%}:host .chart-renderer-root{display:flex;flex-direction:column;width:100%;height:100%;min-height:0}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;flex-shrink:0;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}.chart{direction:ltr;display:flex;flex-direction:row;align-items:flex-end;justify-content:center;flex:1;min-height:0;width:100%}.chart .bar-container{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}.chart .bar-container .bar{display:flex;align-items:flex-end;justify-content:center;background:transparent;border-radius:4px;width:100%;overflow:hidden}.chart .bar-container .value{margin-top:.5rem;font-size:.9rem;text-align:center;color:var(--color-text-primary)}.chart .bar-container .label{margin-top:.5rem;font-size:.9rem;text-align:center;color:var(--color-text-tertiary)}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }] } });

const GRAPH_LAYOUT_OPTIONS = [
    { label: 'Circle', value: 'circle' },
    { label: 'Concentric', value: 'concentric' },
    { label: 'Breadth First', value: 'breadthfirst' },
];
// Lets the Circle / Concentric / Breadth First control live *outside*
// graph-renderer (e.g. stacked above the app's own Data Structures
// panel, in a completely separate component subtree) while still
// driving graph-renderer's actual Cytoscape layout.
//
// graph-renderer previously rendered this toggle itself, floating over
// the graph canvas — but it and the Data Structures panel are siblings
// in two different component trees (one under includeTypes: ['Graph'],
// the other under includeTypes: ['Array2D', 'Chart']), so no amount of
// CSS could move a control that lives *inside* graph-renderer into the
// Data Structures column. Routing the selection through this shared,
// root-provided service lets the app render the control anywhere it
// wants while graph-renderer just reacts to whatever it's set to.
class GraphLayoutService {
    layoutSubject = new BehaviorSubject('circle');
    layout$ = this.layoutSubject.asObservable();
    get currentLayout() {
        return this.layoutSubject.value;
    }
    setLayout(layout) {
        this.layoutSubject.next(layout);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphLayoutService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphLayoutService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphLayoutService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class GraphRenderer {
    state;
    metadata;
    compact = false;
    cyContainer;
    layoutService = inject(GraphLayoutService);
    layoutsByName = {
        circle: { name: 'circle' },
        concentric: { name: 'concentric', minNodeSpacing: 30 },
        breadthfirst: { name: 'breadthfirst' },
    };
    // The Circle/Concentric/Breadth First control itself no longer lives
    // here — it used to float over the graph canvas as its own toolbar,
    // but that put it in a completely different component subtree than
    // the app's Data Structures panel, which made it impossible to stack
    // the two together in one column no matter what CSS was applied to
    // either side. It's now rendered by the consuming app (see
    // visualization-section) wherever it makes sense on the page, and
    // this component just reacts to GraphLayoutService's current value —
    // same underlying Cytoscape layout change, different place for the
    // buttons.
    _currentLayout = this.layoutsByName.circle;
    _isInitialized = false;
    _cy;
    _layoutSubscription;
    // Cytoscape measures its container once on init and then never
    // checks again — it has no idea when the surrounding page changes
    // layout (e.g. the Drawer opening/closing, which resizes this
    // column through pure CSS flex without touching this component's
    // inputs at all). Left alone, the canvas keeps rendering at its old
    // size and visually spills past its new, narrower box instead of
    // shrinking with it. Watching the container itself — not the
    // window — catches every case that actually changes its box,
    // regardless of what caused it.
    _resizeObserver;
    get minHeight() {
        return this.metadata?.minHeight ?? '400px';
    }
    ngOnInit() {
        this._layoutSubscription = this.layoutService.layout$.subscribe((layoutName) => {
            this.changeLayout(this.layoutsByName[layoutName]);
        });
    }
    ngAfterViewInit() {
        this.renderGraph();
        this._isInitialized = true;
        this._resizeObserver = new ResizeObserver(() => {
            // resize() alone tells Cytoscape to re-measure its canvas to the
            // container's current box; fit() then re-frames the existing
            // layout inside that new box so nodes don't end up clipped or
            // stranded off to one side once the column has shrunk or grown.
            this._cy?.resize();
            this._cy?.fit(undefined, 20);
        });
        this._resizeObserver.observe(this.cyContainer.nativeElement);
    }
    ngOnChanges(changes) {
        if ((changes['state'] ||
            changes['metadata'] ||
            changes['compact']) &&
            this.cyContainer &&
            this._isInitialized) {
            this.renderGraph();
            requestAnimationFrame(() => {
                this._cy?.resize();
                this._cy?.fit(undefined, 20);
            });
        }
    }
    ngOnDestroy() {
        this._layoutSubscription?.unsubscribe();
        this._resizeObserver?.disconnect();
        this._resizeObserver = undefined;
        this._cy?.destroy();
        this._cy = undefined;
    }
    changeLayout(layout) {
        this._currentLayout = layout;
        if (this._cy) {
            this._cy
                .layout({ ...this._currentLayout, animate: true, animationDuration: 500 })
                .run();
        }
    }
    // Cytoscape has its own internal stylesheet engine — it is NOT the
    // browser's CSS engine, so style values only ever get matched against
    // Cytoscape's own color regexes (hex/rgb/hsl/named colors). It has no
    // concept of `var(--custom-property)` and silently falls back to the
    // property's default (a flat gray) for anything it can't parse. Every
    // color this renderer receives from rendererMetadata is written as
    // `var(--color-viz-...)` (see practice.ts), so without this resolution
    // step every node/edge — regardless of highlight tag — rendered as the
    // exact same fallback color, which is why the graph never appeared to
    // visually react to the algorithm running. Resolving through
    // getComputedStyle here (real DOM, so var() works normally) turns each
    // token into the flat color Cytoscape can actually parse.
    //
    // Re-resolved on every renderGraph() call (i.e. every frame) rather
    // than cached once, so a dark/light theme toggle mid-run still picks
    // up the new resolved values immediately instead of keeping stale
    // colors from whichever theme was active on first render.
    resolveColor(color) {
        if (!color)
            return color;
        const match = color.trim().match(/^var\((--[\w-]+)\)$/);
        if (!match || !this.cyContainer)
            return color;
        const resolved = getComputedStyle(this.cyContainer.nativeElement).getPropertyValue(match[1]).trim();
        return resolved || color;
    }
    renderGraph() {
        if (!this.state || !this.cyContainer)
            return;
        const nodeTagColors = {};
        this.metadata?.nodeHighlightTags?.forEach((tag) => (nodeTagColors[tag.tag] = this.resolveColor(tag.color)));
        const edgeTagColors = {};
        this.metadata?.edgeHighlightTags?.forEach((tag) => (edgeTagColors[tag.tag] = this.resolveColor(tag.color)));
        const defaultNodeColor = this.resolveColor(this.metadata?.defaultNodeColor) ?? '#ffffff';
        const defaultEdgeColor = this.resolveColor(this.metadata?.defaultEdgeColor) ?? '#000000';
        const elements = [
            ...this.state.nodes.map((n) => {
                const highlightTag = n.highlightTags.at(-1);
                return {
                    data: {
                        id: n.id,
                        label: n.label,
                        color: highlightTag
                            ? (nodeTagColors[highlightTag] ?? defaultNodeColor)
                            : defaultNodeColor,
                    },
                };
            }),
            ...this.state.edges.map((e) => {
                const highlightTag = e.highlightTags.at(-1);
                return {
                    data: {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        label: e.label,
                        color: highlightTag
                            ? (edgeTagColors[highlightTag] ?? defaultEdgeColor)
                            : defaultEdgeColor,
                        weight: parseFloat(e.label) || 1,
                    },
                };
            }),
        ];
        if (!this._cy) {
            this._cy = cytoscape({
                container: this.cyContainer.nativeElement,
                elements,
                layout: this._currentLayout,
                style: [
                    {
                        selector: 'node',
                        style: {
                            width: 40,
                            height: 40,
                            'background-color': 'data(color)',
                            label: 'data(label)',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'border-width': 1,
                            'border-color': '#000',
                            color: '#000',
                            'font-size': 14,
                        },
                    },
                    {
                        selector: 'edge',
                        style: {
                            'line-color': 'data(color)',
                            'target-arrow-shape': 'triangle',
                            'target-arrow-color': 'data(color)',
                            'curve-style': 'bezier',
                            label: 'data(label)',
                            'text-background-color': '#fff',
                            'text-background-opacity': 1,
                            color: '#000',
                            'font-size': 14,
                            width: 3.5,
                        },
                    },
                ],
            });
            return;
        }
        this._cy.batch(() => {
            const currentIds = new Set(elements.map((element) => element.data.id));
            this._cy.elements().forEach((element) => {
                if (!currentIds.has(element.id())) {
                    element.remove();
                    if (element._private.group !== 'edges') {
                        this._cy.layout(this._currentLayout).run();
                    }
                }
            });
            for (const element of elements) {
                const existing = this._cy.getElementById(element.data.id);
                if (existing.nonempty()) {
                    existing.data(element.data);
                }
                else {
                    this._cy.add(element);
                    if (!('source' in element.data)) {
                        this._cy.layout(this._currentLayout).run();
                    }
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: GraphRenderer, isStandalone: true, selector: "graph-renderer", inputs: { state: "state", metadata: "metadata", compact: "compact" }, viewQueries: [{ propertyName: "cyContainer", first: true, predicate: ["cyContainer"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"graph-renderer-root\">\r\n  <div\r\n    #cyContainer\r\n    class=\"graph\"\r\n    [style.height]=\"compact ? '100%' : minHeight\"\r\n  ></div>\r\n</div>", styles: [":host{display:block;width:100%;height:100%;min-width:0;min-height:0;max-width:100%}.graph-renderer-root{position:relative;width:100%;height:100%;min-width:0;min-height:0;max-width:100%}.graph{width:100%;min-width:0;max-width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'graph-renderer', standalone: true, imports: [CommonModule], template: "<div class=\"graph-renderer-root\">\r\n  <div\r\n    #cyContainer\r\n    class=\"graph\"\r\n    [style.height]=\"compact ? '100%' : minHeight\"\r\n  ></div>\r\n</div>", styles: [":host{display:block;width:100%;height:100%;min-width:0;min-height:0;max-width:100%}.graph-renderer-root{position:relative;width:100%;height:100%;min-width:0;min-height:0;max-width:100%}.graph{width:100%;min-width:0;max-width:100%}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }], compact: [{
                type: Input
            }], cyContainer: [{
                type: ViewChild,
                args: ['cyContainer', { static: true }]
            }] } });

class LogRenderer {
    state;
    metadata;
    getMinHeight() {
        return this.metadata?.minHeight ?? '100px';
    }
    getColor() {
        return this.metadata?.defaultColor ?? 'black';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: LogRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: LogRenderer, isStandalone: true, selector: "log-renderer", inputs: { state: "state", metadata: "metadata" }, ngImport: i0, template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"message\" [style.color]=\"getColor()\">{{ state.message }}</div>\r\n</p-card>\r\n", styles: [":host{direction:ltr;display:block;width:100%}:host .message{width:100%;text-align:center;font-size:1.25rem;font-weight:700}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: CardModule }, { kind: "component", type: i1$1.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: LogRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'log-renderer', imports: [CommonModule, CardModule, FormsModule], template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"message\" [style.color]=\"getColor()\">{{ state.message }}</div>\r\n</p-card>\r\n", styles: [":host{direction:ltr;display:block;width:100%}:host .message{width:100%;text-align:center;font-size:1.25rem;font-weight:700}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }] } });

class WebRenderer {
    animation;
    rendererMetadata;
    frameIndex = 0;
    hasPlayer = true;
    showTitle = true;
    compact = false;
    get currentFrame() {
        return (this.animation?.[Math.max(0, Math.min(this.frameIndex, this.animation.length - 1))] ?? null);
    }
    getDocumentName() {
        return this.rendererMetadata?.documentName ?? 'Algorithm';
    }
    onFrameIndexChange(frameIndex) {
        this.frameIndex = frameIndex;
    }
    convertToGraphState(state) {
        return state;
    }
    convertToChartState(state) {
        return state;
    }
    convertToArray2dState(state) {
        return state;
    }
    convertToLogState(state) {
        return state;
    }
    getMetaData(type, id) {
        return this.rendererMetadata?.objectMetaData?.find((objectMetadataEntry) => objectMetadataEntry.type === type)?.metadata;
    }
    convertToGraphMetadata(metadata) {
        return metadata;
    }
    convertToChartMetaData(metadata) {
        return metadata;
    }
    convertToArray2DMetaData(metadata) {
        return metadata;
    }
    convertToLogMetaData(metadata) {
        return metadata;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: WebRenderer, isStandalone: true, selector: "web-renderer", inputs: { animation: "animation", rendererMetadata: "rendererMetadata", frameIndex: "frameIndex", hasPlayer: "hasPlayer", showTitle: "showTitle", compact: "compact" }, ngImport: i0, template: "@if (hasPlayer) {\r\n  <web-player [animationLength]=\"animation?.length\" (frameIndexChange)=\"onFrameIndexChange($event)\"></web-player>\r\n}\r\n\r\n@if (showTitle) {\r\n  <span class=\"title\">{{ getDocumentName() }}</span>\r\n}\r\n\r\n@if (currentFrame; as frame) {\r\n  @for (frameState of frame; track $index) {\r\n    @switch (frameState.type) {\r\n      @case ('Graph') {\r\n        <graph-renderer [state]=\"convertToGraphState(frameState.state)\" [metadata]=\"convertToGraphMetadata(getMetaData(frameState.type, frameState.id))\"\r\n         [compact]=\"compact\"\r\n         />\r\n      }\r\n\r\n      @case ('Log') {\r\n        <log-renderer [state]=\"convertToLogState(frameState.state)\" [metadata]=\"convertToLogMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Array2D') {\r\n        <array-2d-renderer [state]=\"convertToArray2dState(frameState.state)\" [metadata]=\"convertToArray2DMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Chart') {\r\n        <chart-renderer [state]=\"convertToChartState(frameState.state)\" [metadata]=\"convertToChartMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n    }\r\n  }\r\n}\r\n", styles: [":host{padding:.5rem;display:flex;flex-direction:column;justify-content:center;gap:.5rem}:host .title{text-align:left;font-size:1.5rem;font-weight:700;color:#555;padding-inline:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: GraphRenderer, selector: "graph-renderer", inputs: ["state", "metadata", "compact"] }, { kind: "ngmodule", type: KnobModule }, { kind: "ngmodule", type: SliderModule }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: LogRenderer, selector: "log-renderer", inputs: ["state", "metadata"] }, { kind: "component", type: Array2DRenderer, selector: "array-2d-renderer", inputs: ["state", "metadata"] }, { kind: "component", type: ChartRenderer, selector: "chart-renderer", inputs: ["state", "metadata"] }, { kind: "component", type: WebPlayer, selector: "web-player", inputs: ["animationLength", "frameIndex", "frameTime"], outputs: ["frameIndexChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'web-renderer', imports: [
                        FormsModule,
                        GraphRenderer,
                        KnobModule,
                        SliderModule,
                        ButtonModule,
                        LogRenderer,
                        Array2DRenderer,
                        ChartRenderer,
                        WebPlayer,
                    ], template: "@if (hasPlayer) {\r\n  <web-player [animationLength]=\"animation?.length\" (frameIndexChange)=\"onFrameIndexChange($event)\"></web-player>\r\n}\r\n\r\n@if (showTitle) {\r\n  <span class=\"title\">{{ getDocumentName() }}</span>\r\n}\r\n\r\n@if (currentFrame; as frame) {\r\n  @for (frameState of frame; track $index) {\r\n    @switch (frameState.type) {\r\n      @case ('Graph') {\r\n        <graph-renderer [state]=\"convertToGraphState(frameState.state)\" [metadata]=\"convertToGraphMetadata(getMetaData(frameState.type, frameState.id))\"\r\n         [compact]=\"compact\"\r\n         />\r\n      }\r\n\r\n      @case ('Log') {\r\n        <log-renderer [state]=\"convertToLogState(frameState.state)\" [metadata]=\"convertToLogMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Array2D') {\r\n        <array-2d-renderer [state]=\"convertToArray2dState(frameState.state)\" [metadata]=\"convertToArray2DMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Chart') {\r\n        <chart-renderer [state]=\"convertToChartState(frameState.state)\" [metadata]=\"convertToChartMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n    }\r\n  }\r\n}\r\n", styles: [":host{padding:.5rem;display:flex;flex-direction:column;justify-content:center;gap:.5rem}:host .title{text-align:left;font-size:1.5rem;font-weight:700;color:#555;padding-inline:.5rem}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], rendererMetadata: [{
                type: Input
            }], frameIndex: [{
                type: Input
            }], hasPlayer: [{
                type: Input
            }], showTitle: [{
                type: Input
            }], compact: [{
                type: Input
            }] } });

/*
 * Public API Surface of typescript-angular-renderer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Array2DHighlightLayer, Array2DRenderer, ChartHighlightLayer, ChartRenderer, GRAPH_LAYOUT_OPTIONS, GraphLayoutService, GraphRenderer, LogRenderer, WebPlayer, WebRenderer };
//# sourceMappingURL=algorithm-visualizer-typescript-angular-renderer.mjs.map
