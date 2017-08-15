import * as L from 'leaflet';

/**
 * Represents the generic layer
 */
export abstract class LeafLayer{
  public abstract getLayer():L.Layer|Promise<L.Layer>;
  public abstract addToMap(m, lc);
  public abstract getName():string;
  public abstract isBase():boolean;
}

export abstract class LayerBase extends LeafLayer{
  public abstract getLayer():L.Layer|Promise<L.Layer>;
  public abstract isBase():boolean;
  public abstract addToMap(m, lc);

  protected layer;

  protected name:string;

  public getName():string{
    return this.name;
  }
  
}

export abstract class LeafLayerBase extends LayerBase{
  public abstract getLayer():L.Layer|Promise<L.Layer>;
  public abstract isBase():boolean;

  addToMap(m, lc){
    let l = this.getLayer();
    m.addLayer(l);
    if(this.isBase())
      lc.addBaseLayer(l, this.getName());
    else
      lc.addOverlay(l, this.getName());
  }
  
  
}


export abstract class FeatureLayerBase extends LeafLayerBase{
  public abstract getLayer():L.FeatureGroup|Promise<L.FeatureGroup>;
  public abstract isBase():boolean;

  private zoomlayer;

  public getBounds(map){
    let l = this.getLayer();
    if ((<L.FeatureGroup>l).getBounds())
      (<L.FeatureGroup>l).getBounds();
    else
      (<Promise<L.FeatureGroup>>l).then(x => {
        return x.getBounds()
      });
  }
}
