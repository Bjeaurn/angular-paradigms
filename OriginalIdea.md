# Examples

Imagine a page with data, you want to paginate the data cause it's just so much!

```ts
// Reactive
class PaginationService {
  private pageSubject = new BehaviorSubject<number>(1); 

  readonly page$ = this.pageSubject.asObservable(); 
  readonly items$ = this.page$.pipe( 
      switchMap(page => ...), 
      shareReplay()
  );
  
  nextPage() { this.pageSubject.next(this.pageSubject.value + 1); } 
}
this.paginationService.nextPage();
```

```ts 
// NgRx
createEffect(() => this.store.select(getPage).pipe( 
      switchMap(page => ....pipe( 
          map(items => itemsLoaded({ items })) 
      )
   )
);
createReducer(initial, 
   on(nextPageSelected, state => ({ 
      ...state, 
      page: state.page + 1 
   }}) 
); 
this.store.dispatch(nextPageSelected());
```

```ts
// Imperative
class PaginationService {
   currentPage: number = 1
   getItems(page: number = 1) { 
     this.currentPage = page
     return this.http.get(api + this.currentPage) 
   } 
   nextPage() { 
     this.getItems(this.currentPage += 1)
   }
}
```

Okay, now let's introduce filtering!

```ts
// Reactive - complexity increases a bit, but parts are still separated nicely.
class DataService {
  private pageSubject = new BehaviorSubject<number>(1); 
  private filterSubject = new BehaviorSubject<{ query?: string }>({});
  
  readonly page$ = this.pageSubject.asObservable();
  readonly filters$ = this.filterSubject.asObservable();
  readonly items$ = combineLatest(this.page$, this.filters$).pipe( 
      switchMap([page, filters] => ...), 
      shareReplay() 
  );
  
  nextPage() { this.pageSubject.next(this.pageSubject.value + 1); } 
  applyFilter(filter: { query?: string }) { this.filterSubject.next(filter) }
} 
this.dataService.nextPage();
this.dataService.applyFilter()
```

```ts 
// NgRx - just add :)
createEffect(() => this.store.select(getFilters).pipe( 
      switchMap(filters => ....pipe( 
          map(items => itemsLoaded({ items })) 
      )
   ) 
); 
createReducer(initial, 
   on(filtersChanged, state => ({ 
      ...state, 
      filters: state.filters 
   }})
);
this.store.dispatch(filtersChanged());
```

```ts
// Imperative - here is where it gets tricky.
class DataService { 
   currentPage: number = 1 
   currentFilters?: Filter = {}

   getItems(page: number = 1, filters?: Filter = {}) { 
     this.currentPage = page
     this.currentFilters = filters
     return this.http.get(api + this.currentPage + this.currentFilters) // Or however the filters are implemented in your service, this could be separated into different services to improve single responsibility principle.
   }
   nextPage() { 
     this.getItems(this.currentPage += 1)
   }
}
```

// TODO - My private notes (in Dutch) for future reference.

// Backend servers ontlasten op termijn
- Caching zal in deze situaties altijd bij voorkeur aan de service kant zitten; de "state" reflecteert alleen dat: de huidige state. Voor de rest van de applicatie zou het niet uit moeten maken waar de data vandaan komt, wordt altijd aan de service gevraagd.

// Onderhoudbaarheid / uitbreidbaarheid van bestaande en nieuwe spullen
- Imperative; complexiteit van een service, of meerdere services maakt de uitbreidbaarheid wat nauw gekoppeld met de rest van de functionaliteit. Het bijhouden van lokale state op een component in combinatie met de data die in de services leeft houdt de relevante gegevens dicht bij elkaar.
- Reactive; de losse streams zorgen voor een goede scheiding tussen delen functionaliteit, wat eventuele herbuikbaarheid ten goede komt. Tevens ook goed uitbreidbaar omdat de streams los van elkaar goed te definieren zijn, en daarna enkel aan elkaar geknoopt dienen te worden. Leesbaarheid en initiele learning curve met RxJS is echter wel lastig voor nieuwe gebruikers. 
- NgRx; de unidirectionele flow van data zorgt ervoor dat alle delen netjes losgekoppeld van elkaar zijn. Uitbreidbaarheid en deels herbruikbaarheid is daarmee hoog en relatief eenvoudig. De leesbaarheid van de codebase is wel iets ingewikkelder en daarvoor moet je door de learning curve van NgRx. 


Discussion in the Angular discord:
- https://discord.com/channels/748677963142135818/748804900565024768/887271170162958356 ~ https://discord.com/channels/748677963142135818/748804900565024768/887357133614612500

https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/master/libs/article-list/src/lib/%2Bstate/article-list.actions.ts

