import {
  state, trigger, style,
  animate, keyframes, transition,
  AnimationEntryMetadata } from '@angular/core';

export const modalAnimations: AnimationEntryMetadata[] = [
  trigger('modal', [
    state('true', style({ transform: 'none' })),
    state('false', style({ transform: 'translateY(-80vh)' })),
    transition('0 => 1', [
      animate('.3s cubic-bezier(0.47,0,0.745,0.715)', style(
        { transform: 'none', opacity: 1 }
      ))
    ]),
    transition('1 => 0', [
      style({ opacity: 0.3 }),
      animate('.2s cubic-bezier(0.47,0,0.745,0.715)', style(
        { transform: 'translateY(-80vh)', opacity: 0 }
      ))
    ])
  ]),
  trigger('backdrop', [
    state('true', style({ visibility: 'visible' })),
    state('false', style({ visibility: 'hidden' })),
    transition('0 => 1', [
      animate('.2s cubic-bezier(0.47,0,0.745,0.715)', style({ opacity: 1 }))
    ]),
    transition('1 => 0', [
      animate('.2s cubic-bezier(0.47,0,0.745,0.715)', style({ opacity: 0 }))
    ])
  ])
]
