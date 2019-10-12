import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class JamDataSource<T> extends DataSource<T> {
	data: Array<T>;

	constructor(data: Array<T>, private getSortValue: (column: string, o: T) => string | number | undefined) {
		super();
		this.data = data;
	}

	connect(): Observable<Array<T>> {
		const displayDataChanges: Array<any> = [new BehaviorSubject<Array<T>>(this.data)];
		// if (this.sort) {
		// 	displayDataChanges.push(this.sort.sortChange);
		// }
		return merge(...displayDataChanges).pipe(map(() => this.sortData(this.data)));
	}

	sortData(data: Array<T>): Array<T> {
		// if (!this.sort || !this.getSortValue || !this.sort.active || this.sort.direction === '') {
		return data;
		// }
		// return data.sort((a, b) => {
		// 	const propertyA: number | string | undefined = this.getSortValue(this.sort.active, a);
		// 	const propertyB: number | string | undefined = this.getSortValue(this.sort.active, b);
		// 	const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
		// 	const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
		// 	return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
		// });
	}

	disconnect(): void {
		// nada
	}
}
