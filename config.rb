# Require any additional compass plugins here.
require "breakpoint"
require "compass-normalize"
require "json"
require "open-uri"
require 'SassyJSON'
# Set this to the root of your project when deployed:
# Drupal - http_path = "/sites/all/themes/#{THEME_FOLDER}/"
THEME_DIR = File.dirname(__FILE__)
THEME_FOLDER = File.basename(THEME_DIR)
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"
fonts_dir = "fonts"


# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server root.
relative_assets = true


# Assuming this theme is in sites/*/themes/THEMENAME, you can add the partials
# included with a module by uncommenting and modifying one of the lines below:
#add_import_path "../../../default/modules/FOO"
#add_import_path "../../../all/modules/FOO"
#add_import_path "../../../../modules/FOO"


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass


# Disable cache busting on image assets
asset_cache_buster :none


enviroment = :development
# enviroment = :production

if environment == :production
  line_comments = false
  output_style = :compressed
  sourcemap = false
  debug = false
  disable_warnings = true
else
  line_comments = true
  sourcemap = true
  debug = true
  output_style = :expanded
end


$json = JSON.parse( IO.read( THEME_DIR + "/package.json") )
module Sass::Script::Functions
  def theme_description()
    Sass::Script::String.new($json["description"])
  end
  def theme_name()
    Sass::Script::String.new($json["name"])
  end
  def theme_version()
    Sass::Script::String.new($json["version"])
  end
end


on_stylesheet_saved do |filename|
  result = JSON.parse(open("http://www.iheartquotes.com/api/v1/random?format=json").read)
  puts result["quote"]
end
