/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function FloorLineTile({penaltyAmount, tileColor}) {
  return (
    <div css={{marginRight: 1, marginLeft: 1}}>
      <div
        css={{
          border: `1px black solid`, backgroundColor: '#a7a7a7',
          display: "flex", justifyContent: "center", fontSize:12}}
      >
        {penaltyAmount}
      </div>
      <img
        alt="whiteTile"
        src={require(`../../../images/tiles/${tileColor}.png`)}
        css={{border:`1px black solid`}}
      >
      </img>
    </div>
  )
}