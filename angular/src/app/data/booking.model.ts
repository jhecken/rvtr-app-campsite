import { Lodging } from './lodging.model';
import { Profile } from './profile.model';
import { Rental } from './rental.model';
import { Stay } from './stay.model';

/**
 * Represents the _Booking_ model
 *
 * ```yaml
 * id: string;
 * accountId: string;
 * lodgingId: string;
 * lodging: Lodging;
 * guests: Profile[];
 * rentals: Rental[];
 * stay: Stay;
 * status: string;
 * ```
 */
export interface Booking {
  id: string;
  accountId: string;
  lodgingId: string;
  lodging: Lodging;
  guests: Profile[];
  rentals: Rental[];
  stay: Stay;
  status: string;
}
