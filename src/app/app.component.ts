import { Component, OnInit, NgZone, AfterViewInit, ViewChild } from '@angular/core';
import { Human } from './models';
import { RowClassArgs, GridComponent } from '@progress/kendo-angular-grid';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {


	@ViewChild(GridComponent)
	public gridKendo: GridComponent;

	selector: number;
	public selectorArray: string[];
	public sessiArray: string[];
	public humans: Human[];
	public fakeHumans: Human[];
	public paolo: Human;
	public formGroup: FormGroup;
	public formGroupKendo: FormGroup;
	public show: boolean;
	public showKendo: boolean;
	public pageSize = 1;

	constructor(private formBuilder: FormBuilder, private ngZone: NgZone) {
	}

	public ngOnInit(): void {
		this.show = false;
		this.buildForm();
		this.humans = this.getHumans();
		this.fakeHumans = this.getFakeHumans();
		this.selector = 0;
		this.selectorArray = Object.keys(Selector)
			.filter(key => !isNaN(Number(Selector[key])));
		this.sessiArray = Object.keys(Sesso)
			.filter(key => !isNaN(Number(Sesso[key])));
	}
	ngAfterViewInit(): void {
		this.fitColumns();
	}

	private buildForm() {
		this.formGroup = this.formBuilder.group({
			name: ['', Validators.required],
			surname: ['', [Validators.required]],
			birthDate: [new Date(), Validators.required],
			sex: ['', [Validators.required]],
			simpa: [false]
		});
		this.formGroupKendo = this.formBuilder.group({
			name: ['', Validators.required],
			surname: ['', [Validators.required]],
			birthDate: [new Date(), Validators.required],
			sex: ['', [Validators.required]],
			simpa: [false]
		});
	}

	public onCellPrepared(e) {
		if (e.data) {
			if (e.data.age > 10 && e.rowType === 'data' && e.column.dataField === 'age') {
				e.cellElement.css('color', '#D9534F');
			}
		}
	}

	public rowCallback(context: RowClassArgs) { // Da rivedere con Salvatore
		if (context.dataItem.age > 10) {
			return { prova: true };
		} else {
			return {};
		}
	}

	public customizeTooltipDevExtreme(pointInfo: any) {
		if (pointInfo.value > 10) {
			return <any>{
				html: `
				<div>
					<span class="redBack">${pointInfo.value}</span>
					<img width="20" alt="Angular Logo"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
				</div>`
			};
		} else {
			return <any>{
				html: `
				<div>
					${pointInfo.value}
					<img width="20" alt="Angular Logo"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
				</div>`
			}
		}
	}

	public updateSelected(selectedIndex: number) {
		this.selector = selectedIndex;
	}

	public getHumans(): Human[] {
		const tmpArray: Human[] = [
			{ id: 0, name: 'Paolo1', surname: 'Toldo1', age: 10, sex: 'Male' },
			{ id: 0, name: 'Paolo2', surname: 'Toldo2', age: 10, sex: 'Male' },
			{ id: 0, name: 'Paolo3', surname: 'Toldo3', age: 13, sex: 'Male' },
			{ id: 0, name: 'Paolo4', surname: 'Toldo4', age: 14, sex: 'Male' }
		];
		return tmpArray;

	}
	public getFakeHumans(): Human[] {
		const tmpArray: Human[] = [
			{ id: 0, name: 'Paolo1', surname: 'Toldo1', age: 10, sex: 'Maleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' },
			{ id: 0, name: 'Paolo2-----------------', surname: 'Toldo2', age: 10, sex: 'Male' },
			{ id: 0, name: 'Paolo3-', surname: 'Toldo3----------------------------', age: 13, sex: 'Male' },
			{ id: 0, name: 'Paolo4', surname: 'Toldo4', age: 144444444444444444444444444444444444, sex: 'Maleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' }
		];
		return tmpArray;

	}

	public checkAndPrint(): void {
		this.show = true;
	}

	public checkAndPrintKendo(): void {
		this.showKendo = true;
	}
	public onDataStateChange(): void {
		this.fitColumns();
	}

	private fitColumns(): void {
		if (this.gridKendo) {
			this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
				this.gridKendo.autoFitColumns();
			});
		}
	}

	public onPageChange(state: any): void {
		this.pageSize = state.take;
	}
}

enum Selector {
	Grid = 1,
	Chart,
	Form
}
enum Sesso {
	Male = 1,
	Female
}


