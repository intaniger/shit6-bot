import { shuffle } from 'lodash';
import { IndividualState } from '../state.types';
import { toCharMap } from './codes';

export default class Guessing {
  public static updatePossibleCodes = (possibleCodes: string[]): Pick<IndividualState, 'missingIndex' | 'possiblecodes'> => ({
    possiblecodes: possibleCodes,
    missingIndex: toCharMap(
      possibleCodes,
    ).map((minimap, i) => (Object.keys(minimap).length > 1) && i).filter((i): i is number => i !== false),
  })

  public static search = (possibleCodes: string[], char: string, index = -1) => ((index === -1) ? possibleCodes.filter((c) => (new RegExp(char)).test(c))
    : toCharMap(
      possibleCodes,
    )[index][char]);

  private static withSalt = (possibleChars: string[]) => [...new Set(shuffle(possibleChars.concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(2))))]

  public static _possibleCharsFromCodesWithoutSalts = (possibleCodes: string[], index: number) => possibleCodes.map((c) => c.charAt(index))

  public static possibleCharsFromCodes = (possibleCodes: string[], index: number, salt = true) => (salt ? this.withSalt(this._possibleCharsFromCodesWithoutSalts(possibleCodes, index)) : this._possibleCharsFromCodesWithoutSalts(possibleCodes, index))
}
