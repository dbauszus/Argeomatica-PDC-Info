var map,
    lonLat,
    selectCLAVE,
    layerXYZ,
    layerMANZANAS,
    layerSMANZANAS,
    layerREGIONES,
    layerLOTES,
    layerCONSTRUCCIONES,
    OSMB,
    selectControl

function activateControl(id) {
    for (var i in map.controls) {
        var control = map.controls[i]; if (control.id == id) { control.activate(); }
    }
}

function zoomCLAVE(x, y) {
    map.setCenter(new OpenLayers.LonLat(x, y), 19);
    selectCLAVE = $('#tbCLAVEsearch').val();
    for (var i in layerLOTES.features) {
        if (layerLOTES.features[i].attributes.clave == selectCLAVE) {
            selectControl.unselectAll();
            selectControl.select(layerLOTES.features[i]);
        };
    }
}

function extrudeCONSTRUCCIONES() {
    var construccionFeatures = layerCONSTRUCCIONES.features;
    for (var i = 0; i < construccionFeatures.length; i++) {
        construccionFeatures[i].geometry = construccionFeatures[i].geometry.transform('EPSG:3857', 'EPSG:4326');
    }
    var json = new OpenLayers.Format.GeoJSON().write(construccionFeatures);
    json = jQuery.parseJSON(json);
    OSMB.set(json).style({ shadows: false });
}

window.onload = function () {

    OpenLayers.ProxyHost = 'proxy.ashx?url=';

    //test renderer for vector layers
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

    //define map object with base layers
    map = new OpenLayers.Map('map', {
        projection: new OpenLayers.Projection('EPSG:3857'),
        displayProjection: new OpenLayers.Projection('EPSG:4326'),
        units: 'm',
        layers: [new OpenLayers.Layer.Google("Hybrid", { type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20 })],
        controls: [new OpenLayers.PLAYADELCARMEN.Navigation(), new OpenLayers.PLAYADELCARMEN.ArgParser()],
        center: new OpenLayers.LonLat(-87.099, 20.667).transform('EPSG:4326', 'EPSG:3857'),
        zoom: 13
    });

    OSMB = new OSMBuildings(map);
    OSMB.setZIndex(999);

    //tile layer
    layerXYZ = new OpenLayers.Layer.XYZ("XYZ layer", "http://argeomatica2012.cloudapp.net/SOLIDARIDAD_ortho/${z}/${x}/${y}.png", {
        format: 'image/png',
        transitionEffect: 'resize',
        isBaseLayer: false
    });
    map.addLayer(layerXYZ);

    //layerMANZANAS
    var styleMANZANAS = new OpenLayers.Style({
        fillOpacity: 0,
        strokeColor: '#F90',
        strokeWidth: 2,
        label: '${manzana}',
        fontColor: '#F90',
        fontSize: 15
    });
    layerMANZANAS = new OpenLayers.Layer.Vector('layerMANZANAS', {
        projection: 'EPSG:3857',
        maxExtent: new OpenLayers.Bounds(-170, -80, 170, 80).transform('EPSG:4326', 'EPSG:3857'),
        sphericalMercator: true,
        strategies: [new OpenLayers.Strategy.BBOX(), new OpenLayers.Strategy.Refresh({ force: true, active: true })],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://argeomatica2012.cloudapp.net/wxs/wfs.exe?',
            srsName: 'EPSG:3857',
            featureType: 'PDC_MANZANAS',
            geometryName: 'GML_Geometry'
        }),
        styleMap: new OpenLayers.StyleMap({ 'default': styleMANZANAS })
    });
    map.addLayer(layerMANZANAS);
    layerMANZANAS.setVisibility(false);

    //layerSMANZANAS
    var styleSMANZANAS = new OpenLayers.Style({
        fillOpacity: 0,
        strokeColor: '#FCF',
        strokeWidth: 2,
        label: '${smanzana}',
        fontColor: '#FCF',
        fontSize: 14
    });
    layerSMANZANAS = new OpenLayers.Layer.Vector('layerSMANZANAS', {
        projection: 'EPSG:3857',
        maxExtent: new OpenLayers.Bounds(-170, -80, 170, 80).transform('EPSG:4326', 'EPSG:3857'),
        sphericalMercator: true,
        strategies: [new OpenLayers.Strategy.BBOX(), new OpenLayers.Strategy.Refresh({ force: true, active: true })],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://argeomatica2012.cloudapp.net/wxs/wfs.exe?',
            srsName: 'EPSG:3857',
            featureType: 'PDC_SMANZANAS',
            geometryName: 'GML_Geometry'
        }),
        styleMap: new OpenLayers.StyleMap({ 'default': styleSMANZANAS })
    });
    map.addLayer(layerSMANZANAS);
    layerSMANZANAS.setVisibility(false);

    //layerREGIONES
    var styleREGIONES = new OpenLayers.Style({
        fillOpacity: 0,
        strokeColor: '#C03',
        strokeWidth: 2,
        label: '${region}',
        fontColor: '#C03',
        fontSize: 16
    });
    layerREGIONES = new OpenLayers.Layer.Vector('layerREGIONES', {
        projection: 'EPSG:3857',
        maxExtent: new OpenLayers.Bounds(-170, -80, 170, 80).transform('EPSG:4326', 'EPSG:3857'),
        sphericalMercator: true,
        strategies: [new OpenLayers.Strategy.BBOX(), new OpenLayers.Strategy.Refresh({ force: true, active: true })],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://argeomatica2012.cloudapp.net/wxs/wfs.exe?',
            srsName: 'EPSG:3857',
            featureType: 'PDC_REGIONES',
            geometryName: 'GML_Geometry'
        }),
        styleMap: new OpenLayers.StyleMap({ 'default': styleREGIONES })
    });
    map.addLayer(layerREGIONES);

    //create defaultStyle layerLOTES
    var defaultStyle = new OpenLayers.Style({
        fillColor: '',
        fillOpacity: 0,
        strokeColor: '#FF0',
        strokeWidth: 1
    })

    //create selectStyle layerLOTES
    var selectStyle = new OpenLayers.Style({
        fillColor: '#F00',
        fillOpacity: 0.3,
        strokeColor: '#F00',
        strokeWidth: 1
    })

    //stylemap for layerLOTES
    var styleMaplayerLOTES = new OpenLayers.StyleMap({
        'default': defaultStyle,
        'select': selectStyle
    });

    //layerLOTES
    layerLOTES = new OpenLayers.Layer.Vector('layerLOTES', {
        projection: 'EPSG:3857',
        maxExtent: new OpenLayers.Bounds(-170, -80, 170, 80).transform('EPSG:4326', 'EPSG:3857'),
        sphericalMercator: true,
        strategies: [new OpenLayers.Strategy.BBOX(), new OpenLayers.Strategy.Refresh({ force: true, active: true })],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://argeomatica2012.cloudapp.net/wxs/wfs.exe?',
            srsName: 'EPSG:3857',
            featureType: 'PDC_LOTES',
            geometryName: 'GML_Geometry'
        }),
        styleMap: styleMaplayerLOTES
    });
    map.addLayer(layerLOTES);
    layerLOTES.setVisibility(false);
    selectUID = null
    layerLOTES.events.register('loadend', layerLOTES, function () {
        if (selectCLAVE) {
            for (var i = 0; i < layerLOTES.features.length; i++) {
                if (layerLOTES.features[i].attributes.clave == selectCLAVE) {
                    selectControl.unselectAll();
                    selectControl.select(layerLOTES.features[i]);
                };
            }
        }
    });

    ////select control (layerLOTES)
    selectControl = new OpenLayers.PLAYADELCARMEN.SelectFeature(layerLOTES, {
        onSelect: function (e) {
            $('#tbCLAVE_LOTE').val(e.attributes.clave);
            $('#tbSuperficie').val(e.attributes.superficie);
            $('#tbDepartmentos').val(e.attributes.departmentos);
            $('#tbTiendas').val(e.attributes.tiendas);
            $('#tbGastronomia').val(e.attributes.gastronomia);
            $('#tbHotel').val(e.attributes.hotel);
            $('#tbInstitucional').val(e.attributes.institucional);
            $('#tbNotas').val(e.attributes.notas);
            $('#tbStatus').val(e.attributes.status);

            document.getElementById('aspTableClaveFill').click();

            var img = document.getElementById('FOTO');
            img.onerror = function (evt) {
                img.src = 'img/blank.png'
                document.getElementById('frameIMG').style.display = 'none'
            }
            img.src = 'http://portalvhds3dfldyxyc9m64.blob.core.windows.net/pdc/' + e.attributes.clave + '.jpg'
            document.getElementById('frameIMG').style.display = 'block'

            //__doPostBack('updatePnl', '');
        },
        clickout: false
    });
    selectControl.id = 'selectControl';
    selectControl.handlers.feature.stopDown = false;
    map.addControl(selectControl);
    activateControl('selectControl');

    //create defaultStyle layerCONSTRUCCIONES
    var defaultStyle = new OpenLayers.Style({
        fillColor: '',
        fillOpacity: 0,
        strokeColor: '#0FF',
        strokeWidth: 0.5
    })

    //stylemap for layerCONSTRUCCIONES
    var styleMapLayerCONSTRUCCIONES = new OpenLayers.StyleMap({
        'default': defaultStyle
    });

    //layerCONSTRUCCIONES
    layerCONSTRUCCIONES = new OpenLayers.Layer.Vector('layerCONSTRUCCIONES', {
        projection: 'EPSG:3857',
        maxExtent: new OpenLayers.Bounds(-170, -80, 170, 80).transform('EPSG:4326', 'EPSG:3857'),
        sphericalMercator: true,
        strategies: [new OpenLayers.Strategy.BBOX(), new OpenLayers.Strategy.Refresh({ force: true, active: true })],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://argeomatica2012.cloudapp.net/wxs/wfs.exe?',
            srsName: 'EPSG:3857',
            featureType: 'PDC_CONSTRUCCIONES',
            geometryName: 'GML_Geometry'
        }),
        styleMap: styleMapLayerCONSTRUCCIONES
    });
    map.addLayer(layerCONSTRUCCIONES);
    layerCONSTRUCCIONES.setVisibility(false);

    //layerCONSTRUCCIONES.events.register('loadend', layerCONSTRUCCIONES, function () {
    //    if (layerCONSTRUCCIONES.features.length > 0) {
    //        var construccionFeatures = layerCONSTRUCCIONES.features;
    //        for (var i = 0; i < construccionFeatures.length; i++) {
    //            construccionFeatures[i].geometry = construccionFeatures[i].geometry.transform('EPSG:3857', 'EPSG:4326');
    //        }
    //        var json = new OpenLayers.Format.GeoJSON().write(construccionFeatures);
    //        json = jQuery.parseJSON(json);
    //        var osmb = new OSMBuildings(map).set(json);
    //    }
    //});

    //scale threshold
    map.events.on({
        "zoomend": function (e) {
            if (this.getZoom() < 16) {
                layerMANZANAS.setVisibility(false);
                layerSMANZANAS.setVisibility(false);
                layerREGIONES.setVisibility(true);

                layerLOTES.setVisibility(false);
                layerCONSTRUCCIONES.setVisibility(false);
            }
            else if (this.getZoom() < 17) {
                layerMANZANAS.setVisibility(false);
                layerSMANZANAS.setVisibility(true);
                layerREGIONES.setVisibility(true);

                layerLOTES.setVisibility(false);
                layerCONSTRUCCIONES.setVisibility(false);
            }
            else if (this.getZoom() < 18) {
                layerMANZANAS.setVisibility(true);
                layerSMANZANAS.setVisibility(true);
                layerREGIONES.setVisibility(false);

                layerLOTES.setVisibility(false);
                layerCONSTRUCCIONES.setVisibility(false);
            }
            else if (this.getZoom() < 19) {
                layerMANZANAS.setVisibility(true);
                layerSMANZANAS.setVisibility(false);
                layerREGIONES.setVisibility(false);

                layerLOTES.setVisibility(false);
                layerCONSTRUCCIONES.setVisibility(false);
            }
            else {
                layerMANZANAS.setVisibility(false);
                layerSMANZANAS.setVisibility(false);
                layerREGIONES.setVisibility(false);

                layerLOTES.setVisibility(true);
                layerCONSTRUCCIONES.setVisibility(true);
            }
        }
    });

}