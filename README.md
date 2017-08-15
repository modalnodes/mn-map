# MnMap

## Installation
    npm install @modalnodes/mn-map

## Usage
Put the Leaflet CDN loaders from the leaflet website. If you want to use tangram you have to import that js as well.
in your app.module.ts add 
    
    import { MnMapModule } from '@modalnodes/mn-map';

and "MnMapModule" to the imported modules. Then in the code you can simply start using the tags:

    <mn-map [startzoom]="14" [center]="[12.5,44.5]">
        <markerlayer name="points">
            <marker lon="13" lat="44"></marker>
            <marker lon="12" lat="45"></marker>
        </markerlayer>
        <namedlayer layer="osm"></namedlayer>
        <namedlayer layer="positron"></namedlayer>
    </mn-map>