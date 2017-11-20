#!/usr/bin/env node

var amqp = require('amqplib');
// var JsonToSendMagento = {"sku":"BLGA3088-WH001","store_view_code":"","attribute_set_code":"Migration_Default",
// "product_type":null,"product_websites":"base","categories":"","name":"ALIKE SHORT SLV TOP",
// "description":"","short_description":"ALIKE SHORT SLV TOP","weight":1,"product_online":"2",
// "tax_class_name":"Bench.ca - Taxable Goods","visibility":"Catalog, Search","price":"49",
// "special_price":"19.99","special_price_from_date":"","special_price_to_date":"","url_key":"",
// "meta_title":"","meta_keywords":"","meta_description":"","base_image":"","base_image_label":"",
// "small_image":"","small_image_label":"","thumbnail_image":"","thumbnail_image_label":"",
// "swatch_image":"","swatch_image_label":"","created_at":"","updated_at":"","new_from_date":"",
// "new_to_date":"","display_product_options_in":"","map_price":"","msrp_price":"","map_enabled":"",
// "gift_message_available":"","custom_design":"","custom_design_from":"","custom_design_to":"",
// "custom_layout_update":"","page_layout":"","product_options_container":"","msrp_display_actual_price_type":"",
// "qty":"","out_of_stock_qty":0,"use_config_min_qty":1,
// "is_qty_decimal":0,"allow_backorders":0,"use_config_backorders":1,"min_cart_qty":1,
// "use_config_min_sale_qty":0,"max_cart_qty":0,"use_config_max_sale_qty":1,"is_in_stock":1,
// "notify_on_stock_below":"","use_config_notify_stock_qty":1,"manage_stock":0,"use_config_manage_stock":"",
// "use_config_qty_increments":1,"qty_increments":0,"use_config_enable_qty_inc":1,"enable_qty_increments":0,
// "is_decimal_divided":0,"website_id":"","deferred_stock_update":0,"use_config_deferred_stock_update":1,
// "related_skus":"","related_position":"","crosssell_skus":"","crosssell_position":"","upsell_skus":"",
// "upsell_position":"","additional_images":"","additional_image_labels":"","hide_from_product_page":"",
// "bundle_price_type":"","bundle_sku_type":"","bundle_price_view":"","bundle_weight_type":"",
// "configurable_variations_labels":"","associated_skus":""};

var JsonToSendMagento = {"sku":"BLGA3088-WH001","store_view_code":""};
var connectMongo = require('../mongodb/connect.js');
var base_url = "mongodb://localhost:27017/";
var dbname = "magento";
var url = "mongodb://localhost:27017/magento";

var data = {
  action : "insertDocuments",
  collection : "products",
  url : url,
  db : dbname,
  insert : [JsonToSendMagento],
  updateOne : {change : {"sku":"BLGA3088-WH001"}, set: {"sku":"BLGA3088-WH002"}},
  deleteOne : {"sku":"BLGA3088-WH002"} 
}



amqp.connect('amqp://localhost').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(ch) {
    var q = 'task_queue';
    var ok = ch.assertQueue(q, {durable: true});
    let connect = new connectMongo(data);

    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ok = ok.then(function(_qok) {
      return ch.consume('nodejs.export.order', function(msg) {
        var stringToJson = JSON.parse(msg.content);
        console.log(" [x] Received '%s'", stringToJson);
        connect.actionToDb();

      }, {noAck: true});
    });
    return ok.then(function(_consumeOk) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).catch(console.warn);



