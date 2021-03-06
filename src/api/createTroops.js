import * as THREE from 'three'
import { TROOPS } from '../config/sprites/animated'
import { getTileById } from './getters'
import { GENERAL } from '../config/parameters'

export default function createTroops({
    createTroopsSprite,
    troopss,
    tiles,
    id,
    fromTileId,
    toTileId,
    currentZoom,
    initialZoom
}) {
    const from = getTileById({ tiles, idTile: fromTileId })
    const to = getTileById({ tiles, idTile: toTileId })
    const fromX = from.x
    const fromZ = from.z
    const toX = to.x
    const toZ = to.z
    const troops = createTroopsSprite({
        id,
        fromX,
        fromZ,
        toX,
        toZ,
        spriteConf: TROOPS
    })

    const fromVector = new THREE.Vector2(fromX, fromZ)
    const toVector = new THREE.Vector2(toX, toZ)
    const fromVectorReduced = fromVector
        .clone()
        .sub(toVector)
        .normalize()
        .multiplyScalar(-from.area - GENERAL.OFFSET_BETWEEN_TROOPS_TILES)
        .add(fromVector)
    const toVectorReduced = toVector
        .clone()
        .sub(fromVector)
        .normalize()
        .multiplyScalar(-to.area - GENERAL.OFFSET_BETWEEN_TROOPS_TILES)
        .add(toVector)
    const diffX = toVectorReduced.x - fromVectorReduced.x
    const diffZ = toVectorReduced.y - fromVectorReduced.y

    // const helper = new THREE.AxesHelper(10)
    // helper.position.x = fromVectorReduced.x
    // helper.position.z = fromVectorReduced.y
    // sceneSprites.add(helper)

    // const helper2 = new THREE.AxesHelper(10)
    // helper2.position.x = toVectorReduced.x
    // helper2.position.z = toVectorReduced.y
    // sceneSprites.add(helper2)
    troops.diffX = diffX
    troops.diffZ = diffZ
    troops.fromX = fromVectorReduced.x
    troops.fromZ = fromVectorReduced.y
    troops.area = TROOPS.area

    troops.updateScaleDiv(currentZoom, initialZoom)
    troopss.push(troops)
    return troops
}
