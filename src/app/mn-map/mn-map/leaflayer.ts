

/**
 * Represents the generic layer
 */
export interface LeafLayer{
  getLayer():L.Layer|Promise<L.Layer>;
  addToMap(m, lc);
  getName():string;
  isBase():boolean;
}

export abstract class LayerBase implements LeafLayer{
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

  
  zoomlayer;

  getBounds(map){
    let l = this.getLayer();
    
    if ((<L.FeatureGroup>l).getBounds())
      (<L.FeatureGroup>l).getBounds();
    else
      (<Promise<L.FeatureGroup>>l).then(x => {
        return x.getBounds()
      });
  }
  
}


