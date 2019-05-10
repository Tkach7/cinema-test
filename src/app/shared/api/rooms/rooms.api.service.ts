import { Injectable } from "@angular/core";
import { Room } from "./rooms.api.entity";
import { RoomsApiModel } from "./rooms.api.interface";
import { LocalStorageService } from "../../services/localstorage.service";
import { delay } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";

@Injectable()
export class RoomsApiService {
  private static mapRoom(room: RoomsApiModel.RoomItem): Room {
    return new Room(room.ID, room.NUMBER, room.CAPACITY);
  }
  public getRoom(roomNumber: number) {
    return of(
      RoomsApiService.mapRoom(LocalStorageService.getRoom(roomNumber))
    ).pipe(delay(2000));
  }
}
