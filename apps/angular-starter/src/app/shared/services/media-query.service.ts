import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, startWith } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MediaQueryService {
    private readonly mediaQuery = window.matchMedia('(max-width: 767px)');
    private readonly isMobileSubject = new BehaviorSubject<boolean>(this.mediaQuery.matches);

    public isMobile$ = this.isMobileSubject.asObservable();

    constructor() {
        this.initializeMediaQuery();
    }

    private initializeMediaQuery() {
        // Listen for media query changes
        fromEvent(this.mediaQuery, 'change')
            .pipe(
                map((event: any) => event.matches),
                startWith(this.mediaQuery.matches)
            )
            .subscribe(matches => {
                this.isMobileSubject.next(matches);
            });
    }

    get isMobile(): boolean {
        return this.isMobileSubject.value;
    }
}
