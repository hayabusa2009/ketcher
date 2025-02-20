/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import { ElementLabel, Elements } from 'domain/constants'

export interface AtomListParams {
  readonly notList: boolean
  readonly ids: Array<number>
}

export class AtomList {
  notList: boolean
  ids: Array<number>

  constructor(params: AtomListParams) {
    this.notList = params.notList
    this.ids = params.ids
  }

  labelList() {
    const labels: Array<ElementLabel> = []
    for (let id of this.ids) {
      const currenElement = Elements.get(id)
      currenElement && labels.push(currenElement!.label)
    }

    return labels
  }

  label() {
    let label = '[' + this.labelList().join(',') + ']'
    if (this.notList) {
      label = '!' + label
    }
    return label
  }

  equals(atomList: AtomList) {
    return (
      this.notList === atomList.notList &&
      (this.ids || []).sort().toString() ===
        (atomList.ids || []).sort().toString()
    )
  }
}
