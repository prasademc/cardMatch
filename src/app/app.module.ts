import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';
import { TimeComponent } from './components/time/time.component';
import { RendomCardListPipe } from './pipes/rendom-card-list.pipe';
import { CongratsComponent } from './components/congrats/congrats.component';

import { GameStatusService } from './services/game-status.service';
import { GivePenaltyService } from './services/give-penalty.service';
import { StopMultiClicksDirective } from './directives/stop-multi-clicks.directive';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		CardListComponent,
		CardComponent,
		TimeComponent,
		RendomCardListPipe,
		CongratsComponent,
		StopMultiClicksDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		GameStatusService,
		GivePenaltyService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
