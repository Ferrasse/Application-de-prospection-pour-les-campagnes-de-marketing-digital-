import { Directive , Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tooltip-directive',
  templateUrl: './tooltip-directive.component.html',
  styleUrls: ['./tooltip-directive.component.css']
})
export class TooltipDirectiveComponent {
  @Input('appTooltip') tooltipMessage: string;
  tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipMessage)
    );

    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'backgroundColor', '#000');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '5px');
    this.renderer.setStyle(this.tooltipElement, 'top', '-30px');
    this.renderer.setStyle(this.tooltipElement, 'left', '0');
  }

  hideTooltip() {
    this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
  }
}
