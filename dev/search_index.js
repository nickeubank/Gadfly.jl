var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": "Author = \"Tamas Nagy\""
},

{
    "location": "#Gadfly.jl-1",
    "page": "Home",
    "title": "Gadfly.jl",
    "category": "section",
    "text": "Gadfly is a system for plotting and visualization written in Julia. It is based largely on Hadley Wickhams\'s ggplot2 for R and Leland Wilkinson\'s book The Grammar of Graphics. It was Daniel C. Jones\' brainchild and is now maintained by the community. Please consider citing it if you use it in your work."
},

{
    "location": "#Package-features-1",
    "page": "Home",
    "title": "Package features",
    "category": "section",
    "text": "Renders publication quality graphics to SVG, PNG, Postscript, and PDF\nIntuitive and consistent plotting interface\nWorks with Jupyter notebooks via IJulia out of the box\nTight integration with DataFrames.jl\nInteractivity like panning, zooming, toggling powered by Snap.svg\nSupports a large number of common plot types"
},

{
    "location": "#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "The latest release of Gadfly can be installed from the Julia REPL prompt withjulia> Pkg.add(\"Gadfly\")This installs the package and any missing dependencies.  From there, the simplest of plots can be rendered to your default internet browser withjulia> using Gadfly\njulia> plot(y=[1,2,3])Now that you have it installed, check out the Tutorial for a tour of basic plotting and the various manual pages for more advanced usages."
},

{
    "location": "tutorial/#",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "page",
    "text": "Author = \"Tamas Nagy, Daniel C. Jones, Simon Leblanc\""
},

{
    "location": "tutorial/#Tutorial-1",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "section",
    "text": "Gadfly is an implementation of a \"grammar of graphics\" style statistical graphics system for Julia. This tutorial will outline general usage patterns and will give you a feel for the overall system.To begin, we need some data. Gadfly can work with data supplied as either a DataFrame or as plain AbstractArrays. In this tutorial, we\'ll pick and choose some examples from the RDatasets package.Let us use Fisher\'s iris dataset as a starting point.using Gadfly, RDatasets\niris = dataset(\"datasets\", \"iris\")\nset_default_plot_size(14cm, 8cm) # hide\nnothing # hideRow SepalLength SepalWidth PetalLength PetalWidth Species\n1 5.1 3.5 1.4 0.2 setosa\n2 4.9 3.0 1.4 0.2 setosa\n3 4.7 3.2 1.3 0.2 setosa\n4 4.6 3.1 1.5 0.2 setosa\n5 5.0 3.6 1.4 0.2 setosa\n6 5.4 3.9 1.7 0.4 setosa\n... ... ... ... ... ..."
},

{
    "location": "tutorial/#DataFrames-1",
    "page": "Tutorial",
    "title": "DataFrames",
    "category": "section",
    "text": "When used with a DataFrame, the plot function in Gadfly is of the form:plot(data::AbstractDataFrame, elements::Element...; mapping...)The first argument is the data to be plotted and the keyword arguments at the end map \"aesthetics\" to columns in the data frame.  All input arguments between data and mapping are some number of \"elements\", which are the nouns and verbs, so to speak, that form the grammar.Let\'s get to it.p = plot(iris, x=:SepalLength, y=:SepalWidth, Geom.point);\nnothing # hideFirst note that we\'ve taken advantage of the flexibility of Julia\'s handling of function signatures and put the keyword arguments in the midst of the positional arguments.  This is purely for ease of reading.The example above produces a Plot object. It can be saved to a file by drawing to one or more backends using draw.img = SVG(\"iris_plot.svg\", 14cm, 8cm)\ndraw(img, p)\nnothing # hideNow we have the following charming little SVG image.p # hideIf you are working at the REPL, a quicker way to see the image is to omit the semi-colon trailing plot.  This automatically renders the image to your default multimedia display, typically an internet browser.  No need to capture the output argument in this case.plot(iris, x=:SepalLength, y=:SepalWidth)Note that Geom.point will be automatically supplied if no other geometries are given.Alternatively one can manually call display on a Plot object.  This workflow is necessary when display would not otherwise be called automatically.function get_to_it(d)\n  ppoint = plot(d, x=:SepalLength, y=:SepalWidth, Geom.point)\n  pline = plot(d, x=:SepalLength, y=:SepalWidth, Geom.line)\n  ppoint, pline\nend\nps = get_to_it(iris)\nmap(display, ps)For the rest of the demonstrations, we\'ll simply omit the trailing semi-colon for brevity.In this plot we\'ve mapped the x aesthetic to the SepalLength column and the y aesthetic to the SepalWidth. The last argument, Geom.point, is a geometry element which takes bound aesthetics and renders delightful figures. Adding other geometries produces layers, which may or may not result in a coherent plot.plot(iris, x=:SepalLength, y=:SepalWidth, Geom.point, Geom.line)This is the grammar of graphics equivalent of \"colorless green ideas sleep furiously\". It is valid grammar, but not particularly meaningful."
},

{
    "location": "tutorial/#Arrays-1",
    "page": "Tutorial",
    "title": "Arrays",
    "category": "section",
    "text": "If by chance your data are stored in Arrays instead of a DataFrame, fear not, identical plots can be created using an alternate plot signature:plot(elements::Element...; aesthetics...)Here, the keyword arguments directly supply the data to be plotted, instead of using them to indicate which columns of a DataFrame to use.SepalLength = iris[:SepalLength]\nSepalWidth = iris[:SepalWidth]\nplot(x=SepalLength, y=SepalWidth, Geom.point,\n     Guide.xlabel(\"SepalLength\"), Guide.ylabel(\"SepalWidth\"))\nnothing # hideNote that with the Array interface, extra elements must be included to specify the axis labels, whereas with a DataFrame they default to the column names."
},

{
    "location": "tutorial/#Color-1",
    "page": "Tutorial",
    "title": "Color",
    "category": "section",
    "text": "Let\'s do add something meaningful by mapping the color aesthetic.plot(iris, x=:SepalLength, y=:SepalWidth, color=:Species, Geom.point);\n\n# or equivalently for Arrays:\nSepalLength = iris[:SepalLength] # hide\nSepalWidth = iris[:SepalWidth] # hide\nColor = iris[:Species]\nplot(x=SepalLength, y=SepalWidth, color=Color, Geom.point,\n     Guide.xlabel(\"SepalLength\"), Guide.ylabel(\"SepalWidth\"),\n     Guide.colorkey(title=\"Species\"))Ah, a scientific discovery: Setosa has short but wide sepals!Color scales in Gadfly by default are produced from perceptually uniform colorspaces (LUV/LCHuv or LAB/LCHab), though it supports RGB, HSV, HLS, XYZ, and converts arbitrarily between these. Of course, CSS/X11 named colors work too: \"old lace\", anyone?"
},

{
    "location": "tutorial/#Scale-transforms-1",
    "page": "Tutorial",
    "title": "Scale transforms",
    "category": "section",
    "text": "Scale transforms also work as expected. Let\'s look at some data where this is useful.mammals = dataset(\"MASS\", \"mammals\")\nplot(mammals, x=:Body, y=:Brain, label=:Mammal, Geom.point, Geom.label)This is no good, the large animals are ruining things for us. Putting both axes on a log-scale clears things up.plot(mammals, x=:Body, y=:Brain, label=:Mammal, Geom.point, Geom.label,\n     Scale.x_log10, Scale.y_log10)"
},

{
    "location": "tutorial/#Discrete-scales-1",
    "page": "Tutorial",
    "title": "Discrete scales",
    "category": "section",
    "text": "Since all continuous analysis is just degenerate discrete analysis, let\'s take a crack at the latter using some fuel efficiency data.gasoline = dataset(\"Ecdat\", \"Gasoline\")\nplot(gasoline, x=:Year, y=:LGasPCar, color=:Country, Geom.point, Geom.line)We could have added Scale.x_discrete explicitly, but this is detected and the right default is chosen. This is the case with most of the elements in the grammar: we\'ve omitted Scale.x_continuous and Scale.y_continuous in the previous plots, as well as Coord.cartesian, and guide elements such as Guide.xticks, Guide.xlabel, and so on. As much as possible the system tries to fill in the gaps with reasonable defaults."
},

{
    "location": "tutorial/#Rendering-1",
    "page": "Tutorial",
    "title": "Rendering",
    "category": "section",
    "text": "Gadfly uses a custom graphics library called Compose, which is an attempt at a more elegant, purely functional take on the R grid package. It allows mixing of absolute and relative units and complex coordinate transforms.  The primary backend is a native SVG generator (almost native: it uses pango to precompute text extents), though there is also a Cairo backend for PDF and PNG.  See Backends for more details.Building graphics declaratively let\'s you do some fun things. Like stick two plots together:fig1a = plot(iris, x=:SepalLength, y=:SepalWidth, Geom.point)\nfig1b = plot(iris, x=:SepalWidth, Geom.bar)\nfig1 = hstack(fig1a, fig1b)Ultimately this will make more complex visualizations easier to build. For example, facets, plots within plots, and so on. See Compositing for more details."
},

{
    "location": "tutorial/#Interactivity-1",
    "page": "Tutorial",
    "title": "Interactivity",
    "category": "section",
    "text": "One advantage of generating our own SVG is that we can annotate our SVG output and embed Javascript code to provide some level of dynamism.  Though not a replacement for full-fledged custom interactive visualizations of the sort produced by D3, this sort of mild interactivity can improve a lot of standard plots.The fuel efficiency plot is made more clear by toggling off some of the countries, for example.  To do so, first render the plot using the SVGJS backend, which was not used to generate this webpage but is the default at the REPL, then simply click or shift-click in the colored squares in the table of keys to the right.One can also zoom in and out by pressing the shift key while either scrolling the mouse wheel or clicking and dragging a box.  Should your mouse not work, try the plus, minus, I, and O, keys.  Panning is similarly easy: click and drag without depressing the shift key, or use the arrow keys.  For Vim enthusiasts, the H, J, K, and L keys pan as expected.  To reset the plot to it\'s initial state, double click it or hit R.  Lastly, press C to toggle on and off a numerical display of the cursor coordinates."
},

{
    "location": "man/plotting/#",
    "page": "Plotting",
    "title": "Plotting",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "man/plotting/#Plotting-1",
    "page": "Plotting",
    "title": "Plotting",
    "category": "section",
    "text": "Most interaction with Gadfly is through the plot function. Plots are described by binding data to aesthetics, and specifying a number of elements including Scales, Coordinates, Guides, and Geometries.  Aesthetics are a set of special named variables that are mapped to a geometry. How this mapping occurs is defined by the elements.This \"grammar of graphics\" approach tries to avoid arcane incantations and special cases, instead approaching the problem as if one were drawing a wiring diagram: data is connected to aesthetics, which act as input leads, and elements, each self-contained with well-defined inputs and outputs, are connected and combined to produce the desired result."
},

{
    "location": "man/plotting/#Functions-and-Expressions-1",
    "page": "Plotting",
    "title": "Functions and Expressions",
    "category": "section",
    "text": "Along with the standard plot methods operating on DataFrames and Arrays described in the Tutorial, Gadfly has some special signatures to make plotting functions and expressions more convenient.plot(f::Function, lower, upper, elements...; mapping...)\nplot(fs::Vector{T}, lower, upper, elements...; mapping...) where T <: Base.Callable\nplot(f::Function, xmin, xmax, ymin, ymax, elements...; mapping...)\nspy(M::AbstractMatrix, elements...; mapping...) -> PlotFor example:using Gadfly, Random\nset_default_plot_size(21cm, 8cm)\nRandom.seed!(12345)p1 = plot([sin,cos], 0, 2pi)\np2 = plot((x,y)->sin(x)+cos(y), 0, 2pi, 0, 2pi)\np3 = spy(ones(33)*sin.(0:(pi/16):2pi)\' + cos.(0:(pi/16):2pi)*ones(33)\')\nhstack(p1,p2,p3)"
},

{
    "location": "man/plotting/#Wide-formatted-data-1",
    "page": "Plotting",
    "title": "Wide-formatted data",
    "category": "section",
    "text": "Gadfly is designed to plot data in so-called \"long form\", in which data that is of the same type, or measuring the same quantity, are stored in a single column, and any factors or groups are specified by additional columns. This is how data is typically stored in a database.Sometimes data tables are organized by grouping values of the same type into multiple columns, with a column name used to distinguish the grouping. We refer to this as \"wide form\" data.To illustrate the difference consider some historical London birth rate data.births = RDatasets.dataset(\"HistData\", \"Arbuthnot\")[[:Year, :Males, :Females]]Row Year Males Females\n1 1629 5218 4683\n2 1630 4858 4457\n3 1631 4422 4102\n4 1632 4994 4590\n5 1633 5158 4839\n6 1634 5035 4820\n... ... ... ...This table is wide form because \"Males\" and \"Females\" are two columns both measuring number of births. Wide form data can always be transformed to long form (e.g. with the stack function in DataFrames) but this can be inconvenient, especially if the data is not already in a DataFrame.stack(births, [:Males, :Females])Row variable value Year\n1 Males 5218 1629\n2 Males 4858 1630\n3 Males 4422 1631\n... ... ... ...\n162 Females 7623 1708\n163 Females 7380 1709\n164 Females 7288 1710The resulting table is long form with number of births in one column, here with the default name given by stack: \"value\". Data in this form can be plotted very conveniently with Gadfly.using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)births = RDatasets.dataset(\"HistData\", \"Arbuthnot\")[[:Year, :Males, :Females]] # hide\nplot(stack(births, [:Males, :Females]), x=:Year, y=:value, color=:variable,\n     Geom.line)In some cases, explicitly transforming the data can be burdensome. Gadfly lets you avoid this by referring to columns or groups of columns in an implicit long-form version of the data.plot(births, x=:Year, y=Col.value(:Males, :Females),\n     color=Col.index(:Males, :Females), Geom.line)\nnothing # hideHere Col.value produces the concatenated values from a set of columns, and Col.index refers to a vector labeling each value in that concatenation by the column it came from. Also useful is Row.index, which will give the row index of items in a concatenation.This syntax also lets us more conveniently plot data that is not in a DataFrame, such as matrices or arrays of arrays. Below we recreate the plot above for a third time after first converting the DataFrame to an Array.births_array = convert(Array{Int}, births)\nplot(births_array, x=Col.value(1), y=Col.value(2:3...),\n     color=Col.index(2:3...), Geom.line, Scale.color_discrete,\n     Guide.colorkey(labels=[\"Males\",\"Females\"]), Guide.xlabel(\"Year\"))\nnothing # hideWhen given no arguments Row.index, Col.index, and Col.value assume all columns are being concatenated.Plotting arrays of vectors works in much the same way as matrices, but constituent vectors may be of varying lengths."
},

{
    "location": "man/compositing/#",
    "page": "Compositing",
    "title": "Compositing",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "man/compositing/#Compositing-1",
    "page": "Compositing",
    "title": "Compositing",
    "category": "section",
    "text": "Gadfly supports advanced plot composition techniques like faceting, stacking, and layering."
},

{
    "location": "man/compositing/#Facets-1",
    "page": "Compositing",
    "title": "Facets",
    "category": "section",
    "text": "It is easy to make multiple plots that all share a common dataset and axis.using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm) # hide\niris = dataset(\"datasets\", \"iris\")\nplot(iris, xgroup=\"Species\", x=\"SepalLength\", y=\"SepalWidth\",\n     Geom.subplot_grid(Geom.point))Geom.subplot_grid can similarly arrange plots vertically, or even in a 2D grid if there are two shared axes."
},

{
    "location": "man/compositing/#Stacks-1",
    "page": "Compositing",
    "title": "Stacks",
    "category": "section",
    "text": "To composite plots derived from different datasets, or the same data but different axes, a declarative interface is used.  The Tutorial showed how such disparate plots can be horizontally arranged with hstack. Here we illustrate how to vertically stack them with vstack or arrange them in a grid with gridstack.  These commands allow more customization in regards to tick marks, axis labeling, and other plot details than is available with Geom.subplot_grid.using Gadfly, RDatasets, Compose\niris = dataset(\"datasets\", \"iris\")set_default_plot_size(14cm, 16cm) # hide\nfig1a = plot(iris, x=:SepalLength, y=:SepalWidth, Geom.point)\nfig1b = plot(iris, x=:SepalLength, Geom.density,\n             Guide.ylabel(\"density\"), Coord.cartesian(xmin=4, xmax=8))\nvstack(fig1a,fig1b)hstack and vstack can be composed to create arbitrary arrangements of panels.vstack(hstack(p1,p2),hstack(p3,p4,p5))If all rows or columns have the same number of panels, it\'s easiest to use gridstack.gridstack([p1 p2; p3 p4])For each of these commands, you can leave a panel empty by passing in a Compose.context() object.using Compose\nset_default_plot_size(21cm, 16cm) # hide\nfig1c = plot(iris, x=:SepalWidth, Geom.density,\n             Guide.ylabel(\"density\"), Coord.cartesian(xmin=2, xmax=4.5))\ngridstack(Union{Plot,Compose.Context}[fig1a fig1c; fig1b Compose.context()])Note that in this case the array must be explicitly typed.Lastly, title can be used to add a descriptive string to the top of a stack.title(hstack(p1,p2), \"My creative title\")"
},

{
    "location": "man/compositing/#Layers-1",
    "page": "Compositing",
    "title": "Layers",
    "category": "section",
    "text": "Draw multiple layers onto the same plot by inputing Layer objects to plot.using Gadfly, RDatasets, Distributions, StatsBase\nset_default_plot_size(14cm, 8cm)\niris = dataset(\"datasets\", \"iris\")xdata = sort(iris[:SepalWidth])\nydata = cumsum(xdata)\nline = layer(x=xdata, y=ydata, Geom.line, Theme(default_color=\"red\"))\nbars = layer(iris, x=:SepalWidth, Geom.bar)\nplot(line, bars)Note that here we used both the DataFrame and AbstractArrays interface to layer, as well a Theme object.  See Themes for more information on the latter.You can also share the same DataFrame across different layers:plot(iris,\n     layer(x=:SepalLength, y=:SepalWidth),\n     layer(x=:PetalLength, y=:PetalWidth, Theme(default_color=\"red\")))In this case, Gadfly labels the axes with the column names of first layer listed. If this is not what is desired, Guides may be explicitly added.plot(iris,\n     layer(x=:SepalLength, y=:SepalWidth),\n     layer(x=:PetalLength, y=:PetalWidth, Theme(default_color=\"red\")),\n     Guide.xlabel(\"length\"), Guide.ylabel(\"width\"), Guide.title(\"Iris data\"),\n     Guide.manual_color_key(\"\",[\"Sepal\",\"Petal\"],\n                            [Gadfly.current_theme().default_color,\"red\"]))Note that while layer can input Geometries, Statistics, and Themes, it can not input Scales, Coordinates, or Guides.The sequence in which layers are drawn, whether they overlap or not, can be controlled with the order keyword.  Layers with lower order numbers are rendered first.  If not specified, the default order for a layer is 0.  Layers which have the same order number are drawn in the reverse order in which they appear in plot\'s input arguments.bars = layer(iris, x=:SepalWidth, Geom.bar)\nline = layer(iris, x=xdata, y=ydata, Geom.line, Theme(default_color=\"red\"),\n             order=1)\nplot(bars, line)"
},

{
    "location": "man/backends/#",
    "page": "Backends",
    "title": "Backends",
    "category": "page",
    "text": "Author = \"Daniel C. Jones, Tamas Nagy\""
},

{
    "location": "man/backends/#Backends-1",
    "page": "Backends",
    "title": "Backends",
    "category": "section",
    "text": "Gadfly supports creating SVG images out of the box through the native Julian renderer in Compose.jl.  The PNG, PDF, PS, and PGF formats, however, require Julia\'s bindings to cairo and fontconfig, which can be installed withPkg.add(\"Cairo\")\nPkg.add(\"Fontconfig\")"
},

{
    "location": "man/backends/#Rendering-to-a-file-1",
    "page": "Backends",
    "title": "Rendering to a file",
    "category": "section",
    "text": "In addition to the draw interface presented in the Tutorial:p = plot(...)\ndraw(SVG(\"foo.svg\", 6inch, 4inch), p)one can more succintly use Julia\'s function chaining syntax:p |> SVG(\"foo.svg\", 6inch, 4inch)If you plan on drawing many figures of the same size, consider setting it as the default:set_default_plot_size(6inch, 4inch)\np1 |> SVG(\"foo1.svg\")\np2 |> SVG(\"foo2.svg\")\np3 |> SVG(\"foo3.svg\")"
},

{
    "location": "man/backends/#Choosing-a-backend-1",
    "page": "Backends",
    "title": "Choosing a backend",
    "category": "section",
    "text": "Drawing to different backends is easy.  Simply swap SVG for one of SVGJS, PNG, PDF, PS, or PGF:# e.g.\np |> PDF(\"foo.pdf\")"
},

{
    "location": "man/backends/#Interactive-SVGs-1",
    "page": "Backends",
    "title": "Interactive SVGs",
    "category": "section",
    "text": "The SVGJS backend writes SVG with embedded javascript. There are a couple subtleties with using the output from this backend.Drawing to the backend works like any otherdraw(SVGJS(\"foo.svg\", 6inch, 6inch), p)If included with an <img> tag, the output will display as a static SVG image though.<img src=\"foo.svg\"/>For the interactive javascript features to be enabled, it either needs to be included inline in the HTML page, or included with an object tag.<object data=\"foo.svg\" type=\"image/svg+xml\"></object>For the latter, a div element must be placed, and the draw function must be passed the id of this element, so it knows where in the document to place the plot."
},

{
    "location": "man/backends/#IJulia-1",
    "page": "Backends",
    "title": "IJulia",
    "category": "section",
    "text": "The IJulia project adds Julia support to Jupyter. This includes a browser based notebook that can inline graphics and plots. Gadfly works out of the box with IJulia, with or without drawing explicity to a backend.Without an explicit call to draw (i.e. just calling plot without a trailing semicolon), the SVGJS backend is used with the default plot size, which can be changed as described above."
},

{
    "location": "man/themes/#",
    "page": "Themes",
    "title": "Themes",
    "category": "page",
    "text": "Author = \"Daniel C. Jones, Shashi Gowda\""
},

{
    "location": "man/themes/#Themes-1",
    "page": "Themes",
    "title": "Themes",
    "category": "section",
    "text": "Many parameters controlling the appearance of plots can be overridden by passing a Theme object to the plot function, or setting the Theme as the current theme using push_theme or with_theme.The constructor for Theme takes zero or more keyword arguments each of which overrides the default value of the corresponding field.  See Theme for a full list of keywords.using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)  # hide\nmammals = dataset(\"MASS\", \"mammals\")\nplot(mammals, x=:Body, y=:Brain, label=:Mammal,\n     Geom.point, Geom.label, Scale.x_log10, Scale.y_log10,\n     Theme(discrete_highlight_color=x->\"red\", default_color=\"white\"))"
},

{
    "location": "man/themes/#The-Theme-stack-1",
    "page": "Themes",
    "title": "The Theme stack",
    "category": "section",
    "text": "Gadfly maintains a stack of themes and applies theme values from the topmost theme in the stack. This can be useful when you want to set a theme for multiple plots and then switch back to a previous theme.push_theme(t::Theme) and pop_theme() will push and pop from this stack respectively. You can also use with_theme(f, t::Theme) to temporarily set a theme as the current theme and call function f, which can be defined elsewhere, anonymously, or as a do-block.For example, here is how to choose a different font:latex_fonts = Theme(major_label_font=\"CMU Serif\", major_label_font_size=16pt,\n                    minor_label_font=\"CMU Serif\", minor_label_font_size=14pt,\n                    key_title_font=\"CMU Serif\", key_title_font_size=12pt,\n                    key_label_font=\"CMU Serif\", key_label_font_size=10pt)\nGadfly.push_theme(latex_fonts)\ngasoline = dataset(\"Ecdat\", \"Gasoline\")\np = plot(gasoline, x=:Year, y=:LGasPCar, color=:Country, Geom.point, Geom.line)\n# can plot more plots here...\nGadfly.pop_theme()\np # hideThe same effect can be achieved using with_theme:Gadfly.with_theme(latex_fonts) do\n    gasoline = dataset(\"Ecdat\", \"Gasoline\")\n    plot(gasoline, x=:Year, y=:LGasPCar, color=:Country, Geom.point, Geom.line)\nend"
},

{
    "location": "man/themes/#style-1",
    "page": "Themes",
    "title": "style",
    "category": "section",
    "text": "You can use style to override the fields of the current theme. Much like Theme\'s constructor, style inputs keyword arguments, returns a Theme, and can be used with push_theme, with_theme, and plot.Gadfly.push_theme(style(line_width=1mm))\np1 = plot([sin,cos], 0, 2pi)\np2 = plot([sin,cos], 0, 2pi, style(line_width=2mm, line_style=[:dash]))\nfig = hstack(p1,p2)\nGadfly.pop_theme()\nfig # hide"
},

{
    "location": "man/themes/#Named-themes-1",
    "page": "Themes",
    "title": "Named themes",
    "category": "section",
    "text": "To register a theme by name, you can extend Gadfly.get_theme(::Val{:theme_name}) to return a Theme object.Gadfly.get_theme(::Val{:orange}) = Theme(default_color=\"orange\")\n\nGadfly.with_theme(:orange) do\n    plot(dataset(\"datasets\", \"iris\"), x=:SepalWidth, Geom.bar)\nendGadfly comes built in with two named themes: :default and :dark.Gadfly.with_theme(:dark) do\n    plot(dataset(\"datasets\", \"iris\"), x=:SepalLength, y=:SepalWidth, color=:Species)\nendYou can also set a theme to use by default by setting the GADFLY_THEME environment variable before loading Gadfly."
},

{
    "location": "gallery/geometries/#",
    "page": "Geometries",
    "title": "Geometries",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/geometries/#Geometries-1",
    "page": "Geometries",
    "title": "Geometries",
    "category": "section",
    "text": ""
},

{
    "location": "gallery/geometries/#[Geom.abline](@ref)-1",
    "page": "Geometries",
    "title": "Geom.abline",
    "category": "section",
    "text": "using Gadfly, RDatasets, Compose, Random\nRandom.seed!(123)\nset_default_plot_size(21cm, 8cm)\n\np1 = plot(dataset(\"ggplot2\", \"mpg\"),\n     x=\"Cty\", y=\"Hwy\", label=\"Model\", Geom.point, Geom.label,\n     intercept=[0], slope=[1], Geom.abline(color=\"red\", style=:dash),\n     Guide.annotation(compose(context(), text(6,4, \"y=x\", hleft, vtop), fill(\"red\"))))\n\nx = [20*rand(20); exp(-3)]\nD = DataFrame(x=x, y= exp.(-0.5*asinh.(x).+5) .+ 2*randn(length(x))) \nabline = Geom.abline(color=\"red\", style=:dash)\np2 = plot(D, x=:x, y=:y,  Geom.point,  Scale.x_asinh, Scale.y_log,\n     intercept=[148], slope=[-0.5], abline)\nhstack(p1, p2)"
},

{
    "location": "gallery/geometries/#[Geom.bar](@ref)-1",
    "page": "Geometries",
    "title": "Geom.bar",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"HistData\", \"ChestSizes\"), x=\"Chest\", y=\"Count\", Geom.bar)using Gadfly, RDatasets, DataFrames\nset_default_plot_size(21cm, 8cm)\n\nD = by(dataset(\"datasets\",\"HairEyeColor\"), [:Eye,:Sex], d->sum(d[:Freq]))\np1 = plot(D, color=\"Eye\", y=\"x1\", x=\"Sex\", Geom.bar(position=:dodge),\n          Guide.ylabel(\"Freq\"));\n\nrename!(D, :x1 => :Frequency)\npalette = [\"brown\",\"blue\",\"tan\",\"green\"]  # Is there a hazel color?\n\np2a = plot(D, x=:Sex, y=:Frequency, color=:Eye, Geom.bar(position=:stack),\n           Scale.color_discrete_manual(palette...));\np2b = plot(D, x=:Sex, y=:Frequency, color=:Eye, Geom.bar(position=:stack),\n           Scale.color_discrete_manual(palette[4:-1:1]..., order=[4,3,2,1]));\n\nhstack(p1, p2a, p2b)See Scale.color_discrete_manual for more information."
},

{
    "location": "gallery/geometries/#[Geom.beeswarm](@ref)-1",
    "page": "Geometries",
    "title": "Geom.beeswarm",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.beeswarm)"
},

{
    "location": "gallery/geometries/#[Geom.boxplot](@ref)-1",
    "page": "Geometries",
    "title": "Geom.boxplot",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.boxplot)"
},

{
    "location": "gallery/geometries/#[Geom.contour](@ref)-1",
    "page": "Geometries",
    "title": "Geom.contour",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(14cm, 8cm)\nplot(z=(x,y) -> x*exp(-(x-round(Int, x))^2-y^2),\n     xmin=[-8], xmax=[8], ymin=[-2], ymax=[2], Geom.contour)using Gadfly, RDatasets\nset_default_plot_size(21cm, 16cm)\nvolcano = Matrix{Float64}(dataset(\"datasets\", \"volcano\"))\np1 = plot(z=volcano, Geom.contour)\np2 = plot(z=volcano, Geom.contour(levels=[110.0, 150.0, 180.0, 190.0]))\np3 = plot(z=volcano, x=collect(0.0:10:860.0), y=collect(0.0:10:600.0),\n          Geom.contour(levels=2))\nMv = volcano[1:4:end, 1:4:end]\nDv = vcat([DataFrame(x=[1:size(Mv,1);], y=j, z=Mv[:,j]) for j in 1:size(Mv,2)]...)\np4 = plot(Dv, x=:x, y=:y, z=:z, color=:z,\n          Coord.cartesian(xmin=1, xmax=22, ymin=1, ymax=16),\n          Geom.point, Geom.contour(levels=10),\n          style(line_width=0.5mm, point_size=0.2mm) )\ngridstack([p1 p2; p3 p4])"
},

{
    "location": "gallery/geometries/#[Geom.density](@ref)-1",
    "page": "Geometries",
    "title": "Geom.density",
    "category": "section",
    "text": "using Gadfly, RDatasets, Distributions\nset_default_plot_size(21cm, 8cm)\np1 = plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", Geom.density)\np2 = plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\", Geom.density)\nhstack(p1,p2)using Gadfly, RDatasets, Distributions\nset_default_plot_size(14cm, 8cm)\ndist = MixtureModel(Normal, [(0.5, 0.2), (1, 0.1)])\nxs = rand(dist, 10^5)\nplot(layer(x=xs, Geom.density, Theme(default_color=\"orange\")), \n     layer(x=xs, Geom.density(bandwidth=0.0003), Theme(default_color=\"green\")),\n     layer(x=xs, Geom.density(bandwidth=0.25), Theme(default_color=\"purple\")),\n     Guide.manual_color_key(\"bandwidth\", [\"auto\", \"bw=0.0003\", \"bw=0.25\"],\n                            [\"orange\", \"green\", \"purple\"]))"
},

{
    "location": "gallery/geometries/#[Geom.density2d](@ref)-1",
    "page": "Geometries",
    "title": "Geom.density2d",
    "category": "section",
    "text": "using Gadfly, Distributions\nset_default_plot_size(14cm, 8cm)\nplot(x=rand(Rayleigh(2),1000), y=rand(Rayleigh(2),1000),\n     Geom.density2d(levels = x->maximum(x)*0.5.^collect(1:2:8)), Geom.point,\n     Theme(key_position=:none),\n     Scale.color_continuous(colormap=x->colorant\"red\"))"
},

{
    "location": "gallery/geometries/#[Geom.ellipse](@ref)-1",
    "page": "Geometries",
    "title": "Geom.ellipse",
    "category": "section",
    "text": "using RDatasets, Gadfly\nset_default_plot_size(21cm, 8cm)\nD = dataset(\"datasets\",\"faithful\")\nD[:g] = D[:Eruptions].>3.0\ncoord = Coord.cartesian(ymin=40, ymax=100)\npa = plot(D, coord,\n    x=:Eruptions, y=:Waiting, group=:g,\n    Geom.point, Geom.ellipse,\n    Theme(lowlight_color=c->\"gray\") )\npb = plot(D, coord, Guide.ylabel(nothing),\n    x=:Eruptions, y=:Waiting, color=:g,\n    Geom.point, Geom.ellipse(levels=[0.95, 0.99]),\n Theme(key_position=:none, lowlight_color=identity, line_style=[:solid,:dot]))\npc = plot(D, coord, Guide.ylabel(nothing),\n    x=:Eruptions, y=:Waiting, color=:g,\n    Geom.point, Geom.ellipse(fill=true),\n    layer(Geom.ellipse(levels=[0.99]), style(line_style=[:dot])),\n    Theme(key_position=:none) )\nhstack(pa,pb,pc)"
},

{
    "location": "gallery/geometries/#[Geom.errorbar](@ref)-1",
    "page": "Geometries",
    "title": "Geom.errorbar",
    "category": "section",
    "text": "using Gadfly, RDatasets, Distributions, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\nsds = [1, 1/2, 1/4, 1/8, 1/16, 1/32]\nn = 10\nys = [mean(rand(Normal(0, sd), n)) for sd in sds]\nymins = ys .- (1.96 * sds / sqrt(n))\nymaxs = ys .+ (1.96 * sds / sqrt(n))\nplot(x=1:length(sds), y=ys, ymin=ymins, ymax=ymaxs,\n     Geom.point, Geom.errorbar)"
},

{
    "location": "gallery/geometries/#[Geom.hair](@ref)-1",
    "page": "Geometries",
    "title": "Geom.hair",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(21cm, 8cm)\nx= 1:10\ns = [-1,-1,1,1,-1,-1,1,1,-1,-1]\npa = plot(x=x, y=x.^2, Geom.hair, Geom.point)\npb = plot(x=s.*(x.^2), y=x, color=string.(s),\n          Geom.hair(orientation=:horizontal), Geom.point, Theme(key_position=:none))\nhstack(pa, pb)"
},

{
    "location": "gallery/geometries/#[Geom.hexbin](@ref)-1",
    "page": "Geometries",
    "title": "Geom.hexbin",
    "category": "section",
    "text": "using Gadfly, Distributions\nset_default_plot_size(21cm, 8cm)\nX = rand(MultivariateNormal([0.0, 0.0], [1.0 0.5; 0.5 1.0]), 10000);\np1 = plot(x=X[1,:], y=X[2,:], Geom.hexbin)\np2 = plot(x=X[1,:], y=X[2,:], Geom.hexbin(xbincount=100, ybincount=100))\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.histogram](@ref)-1",
    "page": "Geometries",
    "title": "Geom.histogram",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 16cm)\np1 = plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", Geom.histogram)\np2 = plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\", Geom.histogram)\np3 = plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\",\n          Geom.histogram(bincount=30))\np4 = plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\",\n          Geom.histogram(bincount=30, density=true))\ngridstack([p1 p2; p3 p4])"
},

{
    "location": "gallery/geometries/#[Geom.histogram2d](@ref)-1",
    "page": "Geometries",
    "title": "Geom.histogram2d",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\np1 = plot(dataset(\"car\", \"Womenlf\"), x=\"HIncome\", y=\"Region\", Geom.histogram2d)\np2 = plot(dataset(\"car\", \"UN\"), x=\"GDP\", y=\"InfantMortality\",\n          Scale.x_log10, Scale.y_log10, Geom.histogram2d)\np3 = plot(dataset(\"car\", \"UN\"), x=\"GDP\", y=\"InfantMortality\",\n          Scale.x_log10, Scale.y_log10, Geom.histogram2d(xbincount=30, ybincount=30))\nhstack(p1,p2,p3)"
},

{
    "location": "gallery/geometries/#[Geom.hline](@ref),-[Geom.vline](@ref)-1",
    "page": "Geometries",
    "title": "Geom.hline, Geom.vline",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\np1 = plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n          xintercept=[5.0, 7.0], Geom.point, Geom.vline(style=[:solid,[1mm,1mm]]))\np2 = plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n          yintercept=[2.5, 4.0], Geom.point,\n          Geom.hline(color=[\"orange\",\"red\"], size=[2mm,3mm]))\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.label](@ref)-1",
    "page": "Geometries",
    "title": "Geom.label",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"ggplot2\", \"mpg\"), x=\"Cty\", y=\"Hwy\", label=\"Model\",\n     Geom.point, Geom.label)using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\np1 = plot(dataset(\"MASS\", \"mammals\"), x=\"Body\", y=\"Brain\", label=1,\n     Scale.x_log10, Scale.y_log10, Geom.point, Geom.label)\np2 = plot(dataset(\"MASS\", \"mammals\"), x=\"Body\", y=\"Brain\", label=1,\n     Scale.x_log10, Scale.y_log10, Geom.label(position=:centered))\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.line](@ref)-1",
    "page": "Geometries",
    "title": "Geom.line",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\np1 = plot(dataset(\"lattice\", \"melanoma\"), x=\"Year\", y=\"Incidence\", Geom.line)\np2 = plot(dataset(\"Zelig\", \"approval\"), x=\"Month\",  y=\"Approve\", color=\"Year\",\n          Geom.line)\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.path](@ref)-1",
    "page": "Geometries",
    "title": "Geom.path",
    "category": "section",
    "text": "using Gadfly, Random\nset_default_plot_size(21cm, 8cm)\n\nn = 500\nRandom.seed!(1234)\nxjumps = rand(n).-.5\nyjumps = rand(n).-.5\np1 = plot(x=cumsum(xjumps),y=cumsum(yjumps),Geom.path)\n\nt = 0:0.2:8pi\np2 = plot(x=t.*cos.(t), y=t.*sin.(t), Geom.path)\n\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.point](@ref)-1",
    "page": "Geometries",
    "title": "Geom.point",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 12cm)\nD = dataset(\"datasets\", \"iris\")\np1 = plot(D, x=\"SepalLength\", y=\"SepalWidth\", Geom.point);\np2 = plot(D, x=\"SepalLength\", y=\"SepalWidth\", color=\"PetalLength\", Geom.point);\np3 = plot(D, x=\"SepalLength\", y=\"SepalWidth\", color=\"Species\", Geom.point);\np4 = plot(D, x=\"SepalLength\", y=\"SepalWidth\", color=\"Species\", shape=\"Species\",\n          Geom.point);\ngridstack([p1 p2; p3 p4])using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.point)using Gadfly, Distributions\nset_default_plot_size(14cm, 8cm)\nrdata = rand(MvNormal([0,0.],[1 0;0 1.]),100)\nbdata = rand(MvNormal([1,0.],[1 0;0 1.]),100)\nplot(layer(x=rdata[1,:], y=rdata[2,:], color=[colorant\"red\"], Geom.point),\n     layer(x=bdata[1,:], y=bdata[2,:], color=[colorant\"blue\"], Geom.point))"
},

{
    "location": "gallery/geometries/#[Geom.polygon](@ref)-1",
    "page": "Geometries",
    "title": "Geom.polygon",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(14cm, 8cm)\nplot(x=[0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0, 4, 5, 5, 4],\n     y=[0, 0, 1, 1, 0, 0, 3, 3, 2, 2, 3, 3, 0, 0, 3, 3],\n     group=[\"H\", \"H\", \"H\", \"H\", \"H\", \"H\", \"H\", \"H\",\n            \"H\", \"H\", \"H\", \"H\", \"I\", \"I\", \"I\", \"I\"],\n     Geom.polygon(preserve_order=true, fill=true))"
},

{
    "location": "gallery/geometries/#[Geom.rect](@ref),-[Geom.rectbin](@ref)-1",
    "page": "Geometries",
    "title": "Geom.rect, Geom.rectbin",
    "category": "section",
    "text": "using Gadfly, Colors, DataFrames, RDatasets\nset_default_plot_size(21cm, 8cm)\ntheme1 = Theme(default_color=RGBA(0, 0.75, 1.0, 0.5))\nD = DataFrame(x=[0.5,1], y=[0.5,1], x1=[0,0.5], y1=[0,0.5], x2=[1,1.5], y2=[1,1.5])\npa = plot(D, x=:x, y=:y, Geom.rectbin, theme1)\npb = plot(D, xmin=:x1, ymin=:y1, xmax=:x2, ymax=:y2, Geom.rect, theme1)\nhstack(pa, pb)using Gadfly, DataFrames, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"Zelig\", \"macro\"), x=\"Year\", y=\"Country\", color=\"GDP\", Geom.rectbin)"
},

{
    "location": "gallery/geometries/#[Geom.ribbon](@ref)-1",
    "page": "Geometries",
    "title": "Geom.ribbon",
    "category": "section",
    "text": "using Gadfly, Colors, DataFrames, Distributions\nset_default_plot_size(21cm, 8cm)\nX = [cos.(0:0.1:20) sin.(0:0.1:20)]\nx = -4:0.1:4\nDa = [DataFrame(x=0:0.1:20, y=X[:,j], ymin=X[:,j].-0.5, ymax=X[:,j].+0.5, f=\"$f\")  for (j,f) in enumerate([\"cos\",\"sin\"])]\nDb = [DataFrame(x=x, ymax=pdf.(Normal(μ),x), ymin=0.0, u=\"μ=$μ\") for μ in [-1,1] ]\n\n# In the line below, 0.4 is the color opacity\np1 = plot(vcat(Da...), x=:x, y=:y, ymin=:ymin, ymax=:ymax, color=:f, Geom.line, Geom.ribbon,\n    Theme(lowlight_color=c->RGBA{Float32}(c.r, c.g, c.b, 0.4))\n)\np2 = plot(vcat(Db...), x = :x, y=:ymax, ymin = :ymin, ymax = :ymax, color = :u, \n    Geom.line, Geom.ribbon, Guide.ylabel(\"Density\"),\n    Theme(lowlight_color=c->RGBA{Float32}(c.r, c.g, c.b, 0.4)), \n    Guide.colorkey(title=\"\", pos=[2.5,0.6]), Guide.title(\"Parametric PDF\")\n)\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.smooth](@ref)-1",
    "page": "Geometries",
    "title": "Geom.smooth",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\nx_data = 0.0:0.1:2.0\ny_data = x_data.^2 + rand(length(x_data))\np1 = plot(x=x_data, y=y_data, Geom.point, Geom.smooth(method=:loess,smoothing=0.9))\np2 = plot(x=x_data, y=y_data, Geom.point, Geom.smooth(method=:loess,smoothing=0.2))\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.step](@ref)-1",
    "page": "Geometries",
    "title": "Geom.step",
    "category": "section",
    "text": "using Gadfly, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\nplot(x=rand(25), y=rand(25), Geom.step)"
},

{
    "location": "gallery/geometries/#[Geom.subplot_grid](@ref)-1",
    "page": "Geometries",
    "title": "Geom.subplot_grid",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\nplot(dataset(\"datasets\", \"OrchardSprays\"),\n     xgroup=\"Treatment\", x=\"ColPos\", y=\"RowPos\", color=\"Decrease\",\n     Geom.subplot_grid(Geom.point))using Gadfly, RDatasets\nset_default_plot_size(14cm, 25cm)\nplot(dataset(\"vcd\", \"Suicide\"), xgroup=\"Sex\", ygroup=\"Method\", x=\"Age\", y=\"Freq\",\n     Geom.subplot_grid(Geom.bar))using Gadfly, RDatasets, DataFrames\nset_default_plot_size(14cm, 8cm)\niris = dataset(\"datasets\", \"iris\")\nsp = unique(iris[:Species])\nDhl = DataFrame(yint=[3.0, 4.0, 2.5, 3.5, 2.5, 4.0], Species=repeat(sp, inner=[2]) )\n# Try this one too:\n# Dhl = DataFrame(yint=[3.0, 4.0, 2.5, 3.5], Species=repeat(sp[1:2], inner=[2]) )\nplot(iris, xgroup=:Species, x=:SepalLength, y=:SepalWidth,\n    Geom.subplot_grid(layer(Geom.point),\n                      layer(Dhl, xgroup=:Species, yintercept=:yint,\n                            Geom.hline(color=\"red\", style=:dot))))using Gadfly, RDatasets, DataFrames\nset_default_plot_size(14cm, 8cm)\niris = dataset(\"datasets\", \"iris\")\nsp = unique(iris[:Species])\nDhl = DataFrame(yint=[3.0, 4.0, 2.5, 3.5, 2.5, 4.0], Species=repeat(sp, inner=[2]) )\nplot(iris, xgroup=:Species,\n     Geom.subplot_grid(layer(x=:SepalLength, y=:SepalWidth, Geom.point),\n                       layer(Dhl, xgroup=:Species, yintercept=:yint,\n                             Geom.hline(color=\"red\", style=:dot))),\n     Guide.xlabel(\"Xlabel\"), Guide.ylabel(\"Ylabel\"))using Gadfly, RDatasets, DataFrames\nset_default_plot_size(14cm, 12cm)\nwidedf = DataFrame(x = collect(1:10), var1 = collect(1:10), var2 = collect(1:10).^2)\nlongdf = stack(widedf, [:var1, :var2])\np1 = plot(longdf, ygroup=\"variable\", x=\"x\", y=\"value\", Geom.subplot_grid(Geom.point))\np2 = plot(longdf, ygroup=\"variable\", x=\"x\", y=\"value\", Geom.subplot_grid(Geom.point,\n          free_y_axis=true))\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.vector](@ref)-1",
    "page": "Geometries",
    "title": "Geom.vector",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 14cm)\n\nseals = RDatasets.dataset(\"ggplot2\",\"seals\")\nseals[:Latb] = seals[:Lat] + seals[:DeltaLat]\nseals[:Longb] = seals[:Long] + seals[:DeltaLong]\nseals[:Angle] = atan.(seals[:DeltaLat], seals[:DeltaLong])\n\ncoord = Coord.cartesian(xmin=-175.0, xmax=-119, ymin=29, ymax=50)\n# Geom.vector also needs scales for both axes:\nxsc  = Scale.x_continuous(minvalue=-175.0, maxvalue=-119)\nysc  = Scale.y_continuous(minvalue=29, maxvalue=50)\ncolsc = Scale.color_continuous(minvalue=-3, maxvalue=3)\n\nlayer1 = layer(seals, x=:Long, y=:Lat, xend=:Longb, yend=:Latb, color=:Angle,\n               Geom.vector)\n\nplot(layer1, xsc, ysc, colsc, coord)"
},

{
    "location": "gallery/geometries/#[Geom.vectorfield](@ref)-1",
    "page": "Geometries",
    "title": "Geom.vectorfield",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\n\ncoord = Coord.cartesian(xmin=-2, xmax=2, ymin=-2, ymax=2)\np1 = plot(coord, z=(x,y)->x*exp(-(x^2+y^2)), \n          xmin=[-2], xmax=[2], ymin=[-2], ymax=[2], \n# or:     x=-2:0.25:2.0, y=-2:0.25:2.0,     \n          Geom.vectorfield(scale=0.4, samples=17), Geom.contour(levels=6),\n          Scale.x_continuous(minvalue=-2.0, maxvalue=2.0),\n          Scale.y_continuous(minvalue=-2.0, maxvalue=2.0),\n          Guide.xlabel(\"x\"), Guide.ylabel(\"y\"), Guide.colorkey(title=\"z\"))\n\nvolcano = Matrix{Float64}(dataset(\"datasets\", \"volcano\"))\nvolc = volcano[1:4:end, 1:4:end] \ncoord = Coord.cartesian(xmin=1, xmax=22, ymin=1, ymax=16)\np2 = plot(coord, z=volc, x=1.0:22, y=1.0:16,\n          Geom.vectorfield(scale=0.05), Geom.contour(levels=7),\n          Scale.x_continuous(minvalue=1.0, maxvalue=22.0),\n          Scale.y_continuous(minvalue=1.0, maxvalue=16.0),\n          Guide.xlabel(\"x\"), Guide.ylabel(\"y\"),\n          Theme(key_position=:none))\n\nhstack(p1,p2)"
},

{
    "location": "gallery/geometries/#[Geom.violin](@ref)-1",
    "page": "Geometries",
    "title": "Geom.violin",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nDsing = dataset(\"lattice\",\"singer\")\nDsing[:Voice] = [x[1:5] for x in Dsing[:VoicePart]]\nplot(Dsing, x=:VoicePart, y=:Height, color=:Voice, Geom.violin)"
},

{
    "location": "gallery/guides/#",
    "page": "Guides",
    "title": "Guides",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/guides/#Guides-1",
    "page": "Guides",
    "title": "Guides",
    "category": "section",
    "text": ""
},

{
    "location": "gallery/guides/#[Guide.annotation](@ref)-1",
    "page": "Guides",
    "title": "Guide.annotation",
    "category": "section",
    "text": "using Gadfly, Compose\nset_default_plot_size(14cm, 8cm)\nplot(sin, 0, 2pi, Guide.annotation(compose(context(),\n     Shape.circle([pi/2, 3*pi/2], [1.0, -1.0], [2mm]),\n     fill(nothing), stroke(\"orange\"))))"
},

{
    "location": "gallery/guides/#[Guide.colorkey](@ref)-1",
    "page": "Guides",
    "title": "Guide.colorkey",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nDsleep = dataset(\"ggplot2\", \"msleep\")[[:Vore,:BrainWt,:BodyWt,:SleepTotal]]\nDataFrames.dropmissing!(Dsleep)\nDsleep[:SleepTime] = Dsleep[:SleepTotal] .> 8\nplot(Dsleep, x=:BodyWt, y=:BrainWt, Geom.point, color=:SleepTime, \n     Guide.colorkey(title=\"Sleep\", labels=[\">8\",\"≤8\"]),\n     Scale.x_log10, Scale.y_log10 )using Gadfly, Compose, RDatasets\nset_default_plot_size(21cm, 8cm)\niris = dataset(\"datasets\",\"iris\")\npa = plot(iris, x=:SepalLength, y=:PetalLength, color=:Species, Geom.point,\n          Theme(key_position=:inside) )\npb = plot(iris, x=:SepalLength, y=:PetalLength, color=:Species, Geom.point, \n          Guide.colorkey(title=\"Iris\", pos=[0.05w,-0.28h]) )\nhstack(pa, pb)"
},

{
    "location": "gallery/guides/#[Guide.manual_color_key](@ref)-1",
    "page": "Guides",
    "title": "Guide.manual_color_key",
    "category": "section",
    "text": "using Gadfly, DataFrames\nset_default_plot_size(14cm, 8cm)\npoints = DataFrame(index=rand(0:10,30), val=rand(1:10,30))\nline = DataFrame(val=rand(1:10,11), index = collect(0:10))\npointLayer = layer(points, x=\"index\", y=\"val\", Geom.point,Theme(default_color=\"green\"))\nlineLayer = layer(line, x=\"index\", y=\"val\", Geom.line)\nplot(pointLayer, lineLayer,\n     Guide.manual_color_key(\"Legend\", [\"Points\", \"Line\"], [\"green\", \"deepskyblue\"]))"
},

{
    "location": "gallery/guides/#[Guide.shapekey](@ref)-1",
    "page": "Guides",
    "title": "Guide.shapekey",
    "category": "section",
    "text": "using Compose, Gadfly, RDatasets\nset_default_plot_size(16cm, 8cm)\nDsleep = dataset(\"ggplot2\", \"msleep\")\nDsleep = dropmissing!(Dsleep[[:Vore, :Name,:BrainWt,:BodyWt, :SleepTotal]])\nDsleep[:SleepTime] = Dsleep[:SleepTotal] .> 8\nplot(Dsleep, x=:BodyWt, y=:BrainWt, Geom.point, color=:Vore, shape=:SleepTime,\n    Guide.colorkey(pos=[0.05w, -0.25h]),\n    Guide.shapekey(title=\"Sleep (hrs)\", labels=[\">8\",\"≤8\"], pos=[0.18w,-0.315h]),\n    Scale.x_log10, Scale.y_log10,\n    Theme(point_size=2mm, key_swatch_color=\"slategrey\", \n            point_shapes=[Shape.utriangle, Shape.dtriangle]) )"
},

{
    "location": "gallery/guides/#[Guide.title](@ref)-1",
    "page": "Guides",
    "title": "Guide.title",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", Geom.histogram,\n     Guide.title(\"Diamond Price Distribution\"))"
},

{
    "location": "gallery/guides/#[Guide.xlabel](@ref),-[Guide.ylabel](@ref)-1",
    "page": "Guides",
    "title": "Guide.xlabel, Guide.ylabel",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(21cm, 8cm)\np1 = plot(cos, 0, 2π, Guide.xlabel(\"Angle\"));\np2 = plot(cos, 0, 2π, Guide.xlabel(\"Angle\", orientation=:vertical));\np3 = plot(cos, 0, 2π, Guide.xlabel(nothing));\nhstack(p1,p2,p3)"
},

{
    "location": "gallery/guides/#[Guide.xrug](@ref),-[Guide.yrug](@ref)-1",
    "page": "Guides",
    "title": "Guide.xrug, Guide.yrug",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(14cm, 8cm)\nplot(x=rand(20), y=rand(20), Guide.xrug)"
},

{
    "location": "gallery/guides/#[Guide.xticks](@ref),-[Guide.yticks](@ref)-1",
    "page": "Guides",
    "title": "Guide.xticks, Guide.yticks",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(21cm, 8cm)\nticks = [0.1, 0.3, 0.5]\np1 = plot(x=rand(10), y=rand(10), Geom.line, Guide.xticks(ticks=ticks))\np2 = plot(x=rand(10), y=rand(10), Geom.line, Guide.xticks(ticks=ticks, label=false))\np3 = plot(x=rand(10), y=rand(10), Geom.line,\n          Guide.xticks(ticks=ticks, orientation=:vertical))\nhstack(p1,p2,p3)using Gadfly\nset_default_plot_size(14cm, 8cm)\nplot(x=rand(1:10, 10), y=rand(1:10, 10), Geom.line, Guide.xticks(ticks=[1:9;]))"
},

{
    "location": "gallery/statistics/#",
    "page": "Statistics",
    "title": "Statistics",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/statistics/#Statistics-1",
    "page": "Statistics",
    "title": "Statistics",
    "category": "section",
    "text": ""
},

{
    "location": "gallery/statistics/#[Stat.binmean](@ref)-1",
    "page": "Statistics",
    "title": "Stat.binmean",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(21cm, 8cm)\np1 = plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n          Geom.point)\np2 = plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n          Stat.binmean, Geom.point)\nhstack(p1,p2)"
},

{
    "location": "gallery/statistics/#[Stat.density](@ref)-1",
    "page": "Statistics",
    "title": "Stat.density",
    "category": "section",
    "text": "using Colors, DataFrames, Gadfly, Distributions\nset_default_plot_size(21cm, 8cm)\nx = -4:0.1:4\nDa = [DataFrame(x=x, ymax=pdf.(Normal(μ),x), ymin=0.0, u=\"μ=$μ\") for μ in [-1,1]]\nDb = [DataFrame(x=randn(200).+μ, u=\"μ=$μ\") for μ in [-1,1]] \n\np1 = plot(vcat(Da...), x=:x, y=:ymax, ymin=:ymin, ymax=:ymax, color=:u, \n    Geom.line, Geom.ribbon, Guide.ylabel(\"Density\"),\n    Theme(lowlight_color=c->RGBA{Float32}(c.r, c.g, c.b, 0.4)), \n    Guide.colorkey(title=\"\", pos=[2.5,0.6]), Guide.title(\"Parametric PDF\")\n)\np2 = plot(vcat(Db...), x=:x, color=:u, \n    Stat.density(bandwidth=0.5), Geom.polygon(fill=true, preserve_order=true),\n    Coord.cartesian(xmin=-4, xmax=4),\n    Theme(lowlight_color=c->RGBA{Float32}(c.r, c.g, c.b, 0.4)),\n    Guide.colorkey(title=\"\", pos=[2.5,0.6]), Guide.title(\"Kernel PDF\")\n)\nhstack(p1,p2)"
},

{
    "location": "gallery/statistics/#[Stat.qq](@ref)-1",
    "page": "Statistics",
    "title": "Stat.qq",
    "category": "section",
    "text": "using Gadfly, Distributions, Random\nset_default_plot_size(21cm, 8cm)\nRandom.seed!(1234)\np1 = plot(x=rand(Normal(), 100), y=rand(Normal(), 100), Stat.qq, Geom.point)\np2 = plot(x=rand(Normal(), 100), y=Normal(), Stat.qq, Geom.point)\nhstack(p1,p2)"
},

{
    "location": "gallery/statistics/#[Stat.smooth](@ref)-1",
    "page": "Statistics",
    "title": "Stat.smooth",
    "category": "section",
    "text": "using Colors, Compose, Gadfly, RDatasets\nset_default_plot_size(21cm,8cm)\nsalaries = dataset(\"car\",\"Salaries\")\nsalaries.Salary /= 1000.0\nsalaries.Discipline = [\"Discipline $(x)\" for x in salaries.Discipline]\n\np = plot(salaries[salaries.Rank.==\"Prof\",:], x=:YrsService, y=:Salary, \n    color=:Sex, xgroup = :Discipline,\n    Geom.subplot_grid(Geom.point,\n  layer(Stat.smooth(method=:lm, levels=[0.95, 0.99]), Geom.line, Geom.ribbon)), \n    Scale.xgroup(levels=[\"Discipline A\", \"Discipline B\"]),\n    Guide.colorkey(title=\"\", pos=[0.43w, -0.4h]), \n    Theme(point_size=2pt,\n        lowlight_color=c->RGBA{Float32}(c.r, c.g, c.b, 0.2) )\n)using DataFrames, Gadfly\nset_default_plot_size(14cm, 8cm)\nx = range(0.1, stop=4.9, length=30)\nD = DataFrame(x=x, y=x.+randn(length(x)))\np = plot(D, x=:x, y=:y, Geom.point,\n  layer(Stat.smooth(method=:lm, levels=[0.90,0.99]), Geom.line, Geom.ribbon(fill=false)),\n     Theme(lowlight_color=c->\"gray\", line_style=[:solid, :dot])\n)"
},

{
    "location": "gallery/statistics/#[Stat.step](@ref)-1",
    "page": "Statistics",
    "title": "Stat.step",
    "category": "section",
    "text": "using Gadfly, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\nplot(x=rand(25), y=rand(25), Stat.step, Geom.line)"
},

{
    "location": "gallery/statistics/#[Stat.x_jitter](@ref),-[Stat.y_jitter](@ref)-1",
    "page": "Statistics",
    "title": "Stat.x_jitter, Stat.y_jitter",
    "category": "section",
    "text": "using Gadfly, Distributions, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\nplot(x=rand(1:4, 500), y=rand(500), Stat.x_jitter(range=0.5), Geom.point)"
},

{
    "location": "gallery/statistics/#[Stat.xticks](@ref),-[Stat.yticks](@ref)-1",
    "page": "Statistics",
    "title": "Stat.xticks, Stat.yticks",
    "category": "section",
    "text": "using Gadfly, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\nplot(x=rand(10), y=rand(10), Stat.xticks(ticks=[0.0, 0.1, 0.9, 1.0]), Geom.point)"
},

{
    "location": "gallery/coordinates/#",
    "page": "Coordinates",
    "title": "Coordinates",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/coordinates/#Coordinates-1",
    "page": "Coordinates",
    "title": "Coordinates",
    "category": "section",
    "text": ""
},

{
    "location": "gallery/coordinates/#[Coord.cartesian](@ref)-1",
    "page": "Coordinates",
    "title": "Coord.cartesian",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(14cm, 8cm)\nplot(sin, 0, 20, Coord.cartesian(xmin=2π, xmax=4π, ymin=-2, ymax=2))"
},

{
    "location": "gallery/scales/#",
    "page": "Scales",
    "title": "Scales",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scales/#Scales-1",
    "page": "Scales",
    "title": "Scales",
    "category": "section",
    "text": ""
},

{
    "location": "gallery/scales/#[Scale.color_continuous](@ref)-1",
    "page": "Scales",
    "title": "Scale.color_continuous",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(21cm, 8cm)\nxdata, ydata, cdata = rand(12), rand(12), rand(12)\np1 = plot(x=xdata, y=ydata, color=cdata)\np2 = plot(x=xdata, y=ydata, color=cdata,\n          Scale.color_continuous(minvalue=-1, maxvalue=1))\nhstack(p1,p2)using Gadfly, Colors\nset_default_plot_size(21cm, 8cm)\nx = repeat(collect(1:10).-0.5, inner=[10])\ny = repeat(collect(1:10).-0.5, outer=[10])\np1 = plot(x=x, y=y, color=x+y, Geom.rectbin,\n          Scale.color_continuous(colormap=p->RGB(0,p,0)))\np2 = plot(x=x, y=y, color=x+y, Geom.rectbin,\n          Scale.color_continuous(colormap=Scale.lab_gradient(\"green\", \"white\", \"red\")))\np3 = plot(x=x, y=y, color=x+y, Geom.rectbin,\n          Scale.color_continuous(colormap=p->RGB(0,p,0), minvalue=-20))\nhstack(p1,p2,p3)"
},

{
    "location": "gallery/scales/#[Scale.color_discrete_hue](@ref)-1",
    "page": "Scales",
    "title": "Scale.color_discrete_hue",
    "category": "section",
    "text": "using Gadfly, Colors, RDatasets, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\n\nfunction gen_colors(n)\n    cs = distinguishable_colors(n,\n                                [colorant\"#FE4365\", colorant\"#eca25c\"],\n                                lchoices = Float64[58, 45, 72.5, 90],\n                                transform = c -> deuteranopic(c, 0.1),\n                                cchoices = Float64[20,40],\n                                hchoices = [75,51,35,120,180,210,270,310])\n\n    convert(Vector{Color}, cs)\nend\n\niris = dataset(\"datasets\", \"iris\")\nplot(iris, x=:SepalLength, y=:SepalWidth, color=:Species,\n     Geom.point, Scale.color_discrete(gen_colors))using Gadfly, Colors, RDatasets, Random\nset_default_plot_size(21cm, 8cm)\nRandom.seed!(1234)\nxdata, ydata = rand(12), rand(12)\np1 = plot(x=xdata, y=ydata, color=repeat([1,2,3], outer=[4]))\np2 = plot(x=xdata, y=ydata, color=repeat([1,2,3], outer=[4]), Scale.color_discrete)\nhstack(p1,p2)"
},

{
    "location": "gallery/scales/#[Scale.color_discrete_manual](@ref)-1",
    "page": "Scales",
    "title": "Scale.color_discrete_manual",
    "category": "section",
    "text": "using Gadfly, Random\nRandom.seed!(12345)\nset_default_plot_size(14cm, 8cm)\nplot(x=rand(12), y=rand(12), color=repeat([\"a\",\"b\",\"c\"], outer=[4]),\n     Scale.color_discrete_manual(\"red\",\"purple\",\"green\"))using Gadfly, RDatasets, DataFrames\nset_default_plot_size(14cm, 8cm)\nD = by(dataset(\"datasets\",\"HairEyeColor\"), [:Eye,:Sex], d->sum(d[:Freq]))\nrename!(D, :x1, :Frequency)\npalette = [\"brown\",\"blue\",\"tan\",\"green\"] # Is there a hazel color?\npa = plot(D, x=:Sex, y=:Frequency, color=:Eye, Geom.bar(position=:stack),\n          Scale.color_discrete_manual(palette...))\npb = plot(D, x=:Sex, y=:Frequency, color=:Eye, Geom.bar(position=:stack),\n          Scale.color_discrete_manual(palette[4:-1:1]..., order=[4,3,2,1]))\nhstack(pa,pb)"
},

{
    "location": "gallery/scales/#[Scale.color_none](@ref)-1",
    "page": "Scales",
    "title": "Scale.color_none",
    "category": "section",
    "text": "using Gadfly\nset_default_plot_size(21cm, 8cm)\nxs = ys = 1:10.\nzs = Float64[x^2*log(y) for x in xs, y in ys]\np1 = plot(x=xs, y=ys, z=zs, Geom.contour);\np2 = plot(x=xs, y=ys, z=zs, Geom.contour, Scale.color_none);\nhstack(p1,p2)"
},

{
    "location": "gallery/scales/#[Scale.linestyle_discrete](@ref)-1",
    "page": "Scales",
    "title": "Scale.linestyle_discrete",
    "category": "section",
    "text": "using DataFrames, Gadfly, RDatasets\nusing StatsBase: winsor\nset_default_plot_size(18cm, 8cm)\n\nlabs = [ \"exp\", \"sqrt\", \"log\", \"winsor\", \"linear\"]\nfuncs = [ x->60*(1.0.-exp.(-0.2*x)), x->sqrt.(x)*10, x->log.(x)*10, x->winsor(x, prop=0.15), x->x*0.6 ]\nx = [1.0:30;]\nD = vcat([DataFrame(x=x, y=f(x), linev=l) for (f,l) in zip(funcs, labs)]...)\nD[134:136,:y] = NaN\n\np1 = plot(D, x=:x, y=:y, linestyle=:linev, Geom.line )\np2 = plot(dataset(\"datasets\", \"CO2\"), x=:Conc, y=:Uptake, \n    group=:Plant, linestyle=:Treatment, color=:Type, Geom.line,\n    Scale.linestyle_discrete(order=[2,1]),\n    Theme(key_position=:top, key_title_font_size=-8mm) )\nhstack(p1,p2)"
},

{
    "location": "gallery/scales/#[Scale.x_continuous](@ref),-[Scale.y_continuous](@ref)-1",
    "page": "Scales",
    "title": "Scale.x_continuous, Scale.y_continuous",
    "category": "section",
    "text": "using Gadfly, Random, Printf\nset_default_plot_size(21cm, 8cm)\nRandom.seed!(1234)\np1 = plot(x=rand(10), y=rand(10), Scale.x_continuous(minvalue=-10, maxvalue=10))\np2 = plot(x=rand(10), y=rand(10), Scale.x_continuous(format=:scientific))\np3 = plot(x=rand(10), y=rand(10), Scale.x_continuous(labels=x -> @sprintf(\"%0.4f\", x)))\nhstack(p1,p2,p3)using Gadfly, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\nplot(x=rand(10), y=rand(10), Scale.x_log)"
},

{
    "location": "gallery/scales/#[Scale.x_discrete](@ref),-[Scale.y_discrete](@ref)-1",
    "page": "Scales",
    "title": "Scale.x_discrete, Scale.y_discrete",
    "category": "section",
    "text": "using Gadfly, DataFrames, Random\nset_default_plot_size(14cm, 8cm)\nRandom.seed!(1234)\n# Treat numerical x data as categories\np1 = plot(x=rand(1:3, 20), y=rand(20), Scale.x_discrete)\n# To perserve the order of the columns in the plot when plotting a DataFrame\ndf = DataFrame(v1 = randn(10), v2 = randn(10), v3 = randn(10))\np2 = plot(df, x=Col.index, y=Col.value, Scale.x_discrete(levels=names(df)))\nhstack(p1,p2)"
},

{
    "location": "gallery/shapes/#",
    "page": "Shapes",
    "title": "Shapes",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/shapes/#Shapes-1",
    "page": "Shapes",
    "title": "Shapes",
    "category": "section",
    "text": ""
},

{
    "location": "gallery/shapes/#[Shape.square](@ref)-1",
    "page": "Shapes",
    "title": "Shape.square",
    "category": "section",
    "text": "using Gadfly, RDatasets\nset_default_plot_size(14cm, 8cm)\nplot(dataset(\"HistData\",\"DrinksWages\"),\n     x=\"Wage\", y=\"Drinks\", shape=[Shape.square],\n     Geom.point, Scale.y_log10)"
},

{
    "location": "lib/gadfly/#",
    "page": "Gadfly",
    "title": "Gadfly",
    "category": "page",
    "text": "Author = \"Ben J. Arthur\""
},

{
    "location": "lib/gadfly/#Gadfly.Theme",
    "page": "Gadfly",
    "title": "Gadfly.Theme",
    "category": "type",
    "text": "default_color\nIf the color aesthetic is not mapped to anything, this is the color that is used.  (Color)\npoint_size\nSize of points in the point, boxplot, and beeswarm geometries.  (Measure)\npoint_size_min\nMinimum size of points in the point geometry.  (Measure)\npoint_size_max\nMaximum size of points in the point geometry.  (Measure)\npoint_shapes\nShapes of points in the point geometry.  (Function in circle, square, diamond, cross, xcross, utriangle, dtriangle, star1, star2, hexagon, octagon, hline, vline)\nline_width\nWidth of lines in the line geometry. (Measure)\nline_style\nStyle of lines in the line geometry. The default palette is [:solid, :dash, :dot, :dashdot, :dashdotdot, :ldash, :ldashdash, :ldashdot, :ldashdashdot] which is a Vector{Symbol}, or customize using Vector{Vector{<:Measure}}\npanel_fill\nBackground color used in the main plot panel. (Color or Nothing)\npanel_stroke\nBorder color of the main plot panel. (Color or Nothing)\npanel_opacity\nOpacity of the plot background panel. (Float in [0.0, 1.0])\nbackground_color\nBackground color for the entire plot. If nothing, no background. (Color or Nothing)\nplot_padding\nPadding around the plot. The order of padding is: plot_padding=[left, right, top, bottom]. If a vector of length one is provided e.g.  [5mm] then that value is applied to all sides. Absolute or relative units can be used. (Vector{<:Measure})\ngrid_color\nColor of grid lines. (Color or Nothing)\ngrid_line_style\nStyle of grid lines. (Symbol in :solid, :dash, :dot, :dashdot, :dashdotdot, or Vector of Measures)\ngrid_color_focused\nIn the D3 backend, mousing over the plot makes the grid lines emphasised by transitioning to this color. (Color or Nothing)\ngrid_line_width\nWidth of grid lines. (Measure)\nminor_label_font\nFont used for minor labels such as tick labels and entries in keys. (String)\nminor_label_font_size\nFont size used for minor labels. (Measure)\nminor_label_color\nColor used for minor labels. (Color)\nmajor_label_font\nFont used for major labels such as guide titles and axis labels. (String)\nmajor_label_font_size\nFont size used for major labels. (Measure)\nmajor_label_color\nColor used for major labels. (Color)\npoint_label_font\nFont used for labels in Geom.label. (String)\npoint_label_font_size\nFont size used for labels. (Measure)\npoint_label_color\nColor used for labels. (Color)\nkey_title_font\nFont used for titles of keys. (String)\nkey_title_font_size\nFont size used for key titles. (Measure)\nkey_title_color\nColor used for key titles. (Color)\nkey_label_font\nFont used for key entry labels. (String)\nkey_label_font_size\nFont size used for key entry labels. (Measure)\nkey_label_color\nColor used for key entry labels. (Color)\nkey_color_gradations\nHow many gradations to show in a continuous color key. (Int)\nbar_spacing\nSpacing between bars in Geom.bar. (Measure)\nboxplot_spacing\nSpacing between boxplots in Geom.boxplot. (Measure)\nerrorbar_cap_length\nLength of caps on error bars. (Measure)\nstroke_color\nhighlight_width\nWidth of lines drawn around plot geometry like points, and boxplot rectangles. (Measure)\ndiscrete_highlight_color\nColor used to outline plot geometry. This is a function that alters (e.g. darkens) the fill color of the geometry. (Function)\ncontinuous_highlight_color\nColor used to outline plot geometry. This is a function that alters (e.g. darkens) the fill color of the geometry. (Function)\nlowlight_color\nColor used to draw background geometry, such as Geom.ribbon and Geom.polygon. This is a function that alters the fill color of the geometry.  (Function)\nlowlight_opacity\nOpacity of background geometry such as Geom.ribbon.  (Float64)\nmiddle_color\nColor altering function used to draw the midline in boxplots. (Function)\nmiddle_width\nWidth of the middle line in boxplots. (Measure)\nguide_title_position\nOne of :left, :center, :right indicating the placement of the title of color key guides. (Symbol)\ncolorkey_swatch_shape\nThe shape used in color swatches in the color key guide. Either :circle or :square  (Symbol)\nkey_swatch_shape\nShape used in keys for swatches (Function as in point_shapes)\nkey_swatch_color\nDefault color used in keys for swatches.  Currently works for Guide.shapekey (Color)\nkey_position\nWhere key should be placed relative to the plot panel. One of :left, :right, :top, :bottom, :inside or :none. Setting to :none disables the key. Setting to :inside places the key in the lower right quadrant of the plot. (Symbol)\nbar_highlight\nColor used to stroke bars in bar plots. If a function is given, it\'s used to transform the fill color of the bars to obtain a stroke color. (Function, Color, or Nothing)\nrug_size\nlabel_placement_iterations\nNumber of annealing iterations.  Used by Geom.label(position=:dynamic)\nlabel_out_of_bounds_penalty\nPenalty for a label not being contained within the plot frame.  Used by Geom.label(position=:dynamic)\nlabel_hidden_penalty\nPenalty for making a label hidden to avoid overlaps.  Used by Geom.label(position=:dynamic)\nlabel_visibility_flip_pr\nProbability of proposing a visibility flip during label layout.  Used by Geom.label(position=:dynamic)\nlabel_padding\nPadding between marker and label.  Used by Geom.label(position=:dynamic)\nkey_max_columns\nMaximum number of columns for key entry labels. (Int)\ndiscrete_color_scale\nA DiscreteColorScale see Scale.color_discrete_hue\ncontinuous_color_scale\nA ContinuousColorScale see Scale.color_continuous\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Compose.draw-Tuple{Compose.Backend,Plot}",
    "page": "Gadfly",
    "title": "Compose.draw",
    "category": "method",
    "text": "draw(backend::Compose.Backend, p::Plot)\n\nA convenience version of Compose.draw without having to call render.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Compose.gridstack-Tuple{Array{Plot,2}}",
    "page": "Gadfly",
    "title": "Compose.gridstack",
    "category": "method",
    "text": "gridstack(ps::Matrix{Union{Plot,Context}})\n\nArrange plots into a rectangular array.  Use context() as a placeholder for an empty panel.  Heterogeneous matrices must be typed.  See also hstack and vstack.\n\nExamples\n\np1 = plot(x=[1,2], y=[3,4], Geom.line);\np2 = Compose.context();\ngridstack([p1 p1; p1 p1])\ngridstack(Union{Plot,Compose.Context}[p1 p2; p2 p1])\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Compose.hstack-Tuple{Vararg{Union{Context, Plot},N} where N}",
    "page": "Gadfly",
    "title": "Compose.hstack",
    "category": "method",
    "text": "hstack(ps::Union{Plot,Context}...)\nhstack(ps::Vector)\n\nArrange plots into a horizontal row.  Use context() as a placeholder for an empty panel.  Heterogeneous vectors must be typed.  See also vstack, gridstack, and Geom.subplot_grid.\n\nExamples\n\np1 = plot(x=[1,2], y=[3,4], Geom.line);\np2 = Compose.context();\nhstack(p1, p2)\nhstack(Union{Plot,Compose.Context}[p1, p2])\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Compose.vstack-Tuple{Vararg{Union{Context, Plot},N} where N}",
    "page": "Gadfly",
    "title": "Compose.vstack",
    "category": "method",
    "text": "vstack(ps::Union{Plot,Context}...)\nvstack(ps::Vector)\n\nArrange plots into a vertical column.  Use context() as a placeholder for an empty panel.  Heterogeneous vectors must be typed.  See also hstack, gridstack, and Geom.subplot_grid.\n\nExamples\n\np1 = plot(x=[1,2], y=[3,4], Geom.line);\np2 = Compose.context();\nvstack(p1, p2)\nvstack(Union{Plot,Compose.Context}[p1, p2])\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.layer-Tuple{Any,Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.layer",
    "category": "method",
    "text": "layer(data_source::Union{AbstractDataFrame, Void}),\n      elements::ElementOrFunction...; mapping...) -> [Layers]\n\nCreate a layer element based on the data in data_source, to later input into plot.  elements can be Statistics, Geometries, and/or Themes (but not Scales, Coordinates, or Guides). mapping are aesthetics.\n\nExamples\n\nls=[]\nappend!(ls, layer(y=[1,2,3], Geom.line))\nappend!(ls, layer(y=[3,2,1], Geom.point))\nplot(ls..., Guide.title(\"layer example\"))\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.layer-Tuple{Function,Number,Number,Number,Number,Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.layer",
    "category": "method",
    "text": "layer(f::Function, xmin::Number, xmax::Number, ymin::Number, ymax::Number,\n      elements::ElementOrFunction...; mapping...) -> [Layers]\n\nCreate a layer of the contours of the 2D function or expression in f. See Stat.func and Geom.contour.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.layer-Tuple{Function,Number,Number,Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.layer",
    "category": "method",
    "text": "layer(f::Function, lower::Number, upper::Number,\n      elements::ElementOrFunction...) -> [Layers]\n\nCreate a layer from the function or expression f, which takes a single argument or operates on a single variable, respectively, between the lower and upper bounds.  See Stat.func and Geom.line.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.layer-Tuple{Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.layer",
    "category": "method",
    "text": "layer(elements::ElementOrFunction...; mapping...) =\n      layer(nothing, elements...; mapping...) -> [Layers]\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.layer-Union{Tuple{T}, Tuple{Array{T,1},Number,Number,Vararg{Union{Function, Element, Theme, Type},N} where N}} where T<:Union{Function, Type}",
    "page": "Gadfly",
    "title": "Gadfly.layer",
    "category": "method",
    "text": "layer(fs::Vector{T}, lower::Number, upper::Number,\n      elements::ElementOrFunction...) where T <: Base.Callable -> [Layers]\n\nCreate a layer from a list of functions or expressions in fs.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.plot-Tuple{Any,Dict,Vararg{Union{Array{Layer,1}, Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.plot",
    "category": "method",
    "text": "plot(data_source::Union{Void, AbstractMatrix, AbstractDataFrame},\n     mapping::Dict, elements::ElementOrFunctionOrLayers...) -> Plot\n\nThe old fashioned (pre-named arguments) version of plot.  This version takes an explicit mapping dictionary, mapping aesthetics symbols to expressions or columns in the data frame.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.plot-Tuple{Any,Vararg{Union{Array{Layer,1}, Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.plot",
    "category": "method",
    "text": "plot(data_source::Union{AbstractMatrix, AbstractDataFrame},\n     elements::ElementOrFunctionOrLayers...; mapping...) -> Plot\n\nCreate a new plot by specifying a data_source, zero or more elements (Scales, Statistics, Coordinates, Geometries, Guides, Themes, and/or Layers), and a mapping of aesthetics to columns or expressions of the data.\n\nExamples\n\nmy_frame = DataFrame(time=1917:2018, price=1.02.^(0:101))\nplot(my_frame, x=:time, y=:price, Geom.line)\n\nmy_matrix = [1917:2018 1.02.^(0:101)]\nplot(my_matrix, x=Col.value(1), y=Col.value(2), Geom.line,\n     Guide.xlabel(\"time\"), Guide.ylabel(\"price\"))\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.plot-Tuple{Function,Number,Number,Number,Number,Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.plot",
    "category": "method",
    "text": "plot(f::Function, xmin::Number, xmax::Number, ymin::Number, ymax::Number,\n     elements::ElementOrFunction...; mapping...)\n\nPlot the contours of the 2D function or expression in f. See Stat.func and Geom.contour.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.plot-Tuple{Function,Number,Number,Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.plot",
    "category": "method",
    "text": "plot(f::Function, lower::Number, upper::Number, elements::ElementOrFunction...;\n     mapping...)\n\nPlot the function or expression f, which takes a single argument or operates on a single variable, respectively, between the lower and upper bounds.  See Stat.func and Geom.line.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.plot-Tuple{Vararg{Union{Array{Layer,1}, Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.plot",
    "category": "method",
    "text": "plot(elements::ElementOrFunctionOrLayers...; aesthetics...) -> Plot\n\nCreate a new plot of the vectors in \'aesthetics\'.  Optional elements (Scales, Statistics, Coordinates, Geometries, Guides, Themes, and/or Layers) control the layout, labelling, and transformation of the data.\n\nExamples\n\nplot(x=collect(1917:2018), y=1.02.^(0:101), Geom.line)\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.plot-Union{Tuple{T}, Tuple{Array{T,1},Number,Number,Vararg{Union{Function, Element, Theme, Type},N} where N}} where T<:Union{Function, Type}",
    "page": "Gadfly",
    "title": "Gadfly.plot",
    "category": "method",
    "text": "plot(fs::Vector{T}, lower::Number, upper::Number, elements::ElementOrFunction...;\n     mapping...) where T <: Base.Callable\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.render-Tuple{Plot}",
    "page": "Gadfly",
    "title": "Gadfly.render",
    "category": "method",
    "text": "render(plot::Plot) -> Context\n\nRender plot to a Compose context.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.set_default_plot_format-Tuple{Symbol}",
    "page": "Gadfly",
    "title": "Gadfly.set_default_plot_format",
    "category": "method",
    "text": "set_default_plot_format(fmt::Symbol)\n\nSets the default plot format.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.set_default_plot_size-Tuple{Union{Number, Measure},Union{Number, Measure}}",
    "page": "Gadfly",
    "title": "Gadfly.set_default_plot_size",
    "category": "method",
    "text": "set_default_plot_size(width::Compose.MeasureOrNumber,\n                      height::Compose.MeasureOrNumber)\n\nSets preferred canvas size when rendering a plot without an explicit call to draw.  Units can be inch, cm, mm, pt, or px.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.spy-Tuple{AbstractArray{T,2} where T,Vararg{Union{Function, Element, Theme, Type},N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.spy",
    "category": "method",
    "text": "spy(M::AbstractMatrix, elements::ElementOrFunction...; mapping...) -> Plot\n\nPlots a heatmap of M, with M[1,1] in the upper left.  NaN values are left blank, and an error is thrown if all elements of M are NaN.  See Geom.rectbin and Coord.cartesian(fixed=true)...).\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.style-Tuple{}",
    "page": "Gadfly",
    "title": "Gadfly.style",
    "category": "method",
    "text": "style(; kwargs...) -> Theme\n\nReturn a new Theme that is a copy of the current theme as modifed by the attributes in kwargs.  See Themes for available fields.\n\nExamples\n\nstyle(background_color=\"gray\")\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.title-Tuple{Context,String,Vararg{Compose.Property,N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.title",
    "category": "method",
    "text": "title(ctx::Context, str::String, props::Property...) -> Context\n\nAdd a title string to a group of plots, typically created with vstack, hstack, or gridstack.\n\nExamples\n\np1 = plot(x=[1,2], y=[3,4], Geom.line);\np2 = plot(x=[1,2], y=[4,3], Geom.line);\ntitle(hstack(p1,p2), \"my latest data\", Compose.fontsize(18pt), fill(colorant\"red\"))\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Base.Multimedia.display-Tuple{Gadfly.GadflyDisplay,Union{Context, Plot}}",
    "page": "Gadfly",
    "title": "Base.Multimedia.display",
    "category": "method",
    "text": "display(p::Plot)\n\nRender p to a multimedia display, typically an internet browser. This function is handy when rendering by plot has been suppressed with either trailing semi-colon or by calling it within a function.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.current_theme-Tuple{}",
    "page": "Gadfly",
    "title": "Gadfly.current_theme",
    "category": "method",
    "text": "current_theme()\n\nGet the Theme on top of the theme stack.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.get_theme-Tuple{Val{:dark}}",
    "page": "Gadfly",
    "title": "Gadfly.get_theme",
    "category": "method",
    "text": "get_theme(::Val{:dark})\n\nA light foreground on a dark background.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.get_theme-Tuple{Val{:default}}",
    "page": "Gadfly",
    "title": "Gadfly.get_theme",
    "category": "method",
    "text": "get_theme(::Val{:default})\n\nA dark foreground on a light background.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.get_theme-Union{Tuple{Val{name}}, Tuple{name}} where name",
    "page": "Gadfly",
    "title": "Gadfly.get_theme",
    "category": "method",
    "text": "get_theme()\n\nRegister a theme by name by adding methods to get_theme.\n\nExamples\n\nget_theme(::Val{:mytheme}) = Theme(...)\npush_theme(:mytheme)\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.lab_gradient-Tuple{Vararg{ColorTypes.Color,N} where N}",
    "page": "Gadfly",
    "title": "Gadfly.lab_gradient",
    "category": "method",
    "text": "function lab_gradient(cs::Color...)\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.lab_rainbow-NTuple{4,Any}",
    "page": "Gadfly",
    "title": "Gadfly.lab_rainbow",
    "category": "method",
    "text": "lab_rainbow(l, c, h0, n)\n\nGenerate n colors in the LCHab colorspace by using a fixed luminance l and chroma c, and varying the hue, starting at h0.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.lchabmix-NTuple{4,Any}",
    "page": "Gadfly",
    "title": "Gadfly.lchabmix",
    "category": "method",
    "text": "function lchabmix(c0_, c1_, r, power)\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.luv_rainbow-NTuple{4,Any}",
    "page": "Gadfly",
    "title": "Gadfly.luv_rainbow",
    "category": "method",
    "text": "luv_rainbow(l, c, h0, n)\n\nGenerate n colors in the LCHuv colorspace by using a fixed luminance l and chroma c, and varying the hue, starting at h0.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.pop_theme-Tuple{}",
    "page": "Gadfly",
    "title": "Gadfly.pop_theme",
    "category": "method",
    "text": "pop_theme() -> Theme\n\nReturn to using the previous theme by removing the top item on the theme stack. See also pop_theme and with_theme.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.push_theme-Tuple{Symbol}",
    "page": "Gadfly",
    "title": "Gadfly.push_theme",
    "category": "method",
    "text": "push_theme(t::Symbol)\n\nPush a Theme by its name.  Available options are :default and :dark. See also get_theme.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.push_theme-Tuple{Theme}",
    "page": "Gadfly",
    "title": "Gadfly.push_theme",
    "category": "method",
    "text": "push_theme(t::Theme)\n\nSet the current theme by placing t onto the top of the theme stack. See also pop_theme and with_theme.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.weighted_color_mean-Union{Tuple{T}, Tuple{S}, Tuple{AbstractArray{Lab{T},1},AbstractArray{S,1}}} where T where S<:Number",
    "page": "Gadfly",
    "title": "Gadfly.weighted_color_mean",
    "category": "method",
    "text": "function weighted_color_mean(cs::AbstractArray{Lab{T},1},\n                             ws::AbstractArray{S,1}) where {S <: Number,T}\n\nReturn the mean of Lab colors cs as weighted by ws.\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly.with_theme-Tuple{Any,Any}",
    "page": "Gadfly",
    "title": "Gadfly.with_theme",
    "category": "method",
    "text": "with_theme(f, theme)\n\nCall function f with theme as the current Theme. theme can be a Theme object or a symbol.\n\nExamples\n\nwith_theme(style(background_color=colorant\"#888888\"))) do\n    plot(x=rand(10), y=rand(10))\nend\n\n\n\n\n\n"
},

{
    "location": "lib/gadfly/#Gadfly-1",
    "page": "Gadfly",
    "title": "Gadfly",
    "category": "section",
    "text": "Modules = [Compose, Gadfly]Modules = [Gadfly]"
},

{
    "location": "lib/geometries/#",
    "page": "Geometries",
    "title": "Geometries",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geometries/#Gadfly.Geom.abline",
    "page": "Geometries",
    "title": "Gadfly.Geom.abline",
    "category": "type",
    "text": "Geom.abline[(; color=nothing, size=nothing, style=nothing)]\n\nFor each corresponding pair of elements in the intercept and slope aesthetics, draw the lines T(y) = slope * T(x) + intercept across the plot canvas, where T(⋅) defaults to the identity function. If unspecified, intercept defaults to [0] and slope to [1].\n\nThis geometry also works with nonlinear Scale transformations of the y and/or x variable, with one caveat: for log transformations of the x variable, the intercept is the y-value at x=1 rather than at x=0. \n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.bar",
    "page": "Geometries",
    "title": "Gadfly.Geom.bar",
    "category": "type",
    "text": "Geom.bar[(; position=:stack, orientation=:vertical)]\n\nDraw bars of height y centered at positions x, or from xmin to xmax. If orientation is :horizontal switch x for y.  Optionally categorically groups bars using the color aesthetic.  If position is :stack they will be placed on top of each other;  if it is :dodge they will be placed side by side.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.beeswarm",
    "page": "Geometries",
    "title": "Gadfly.Geom.beeswarm",
    "category": "type",
    "text": "Geom.beeswarm[; (orientation=:vertical, padding=0.1mm)]\n\nPlot the x and y aesthetics, the former being categorical and the latter continuous, by shifting the x position of each point to ensure that there is at least padding gap between neighbors.  If orientation is :horizontal, switch x for y.  Points can optionally be colored using the color aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.boxplot",
    "page": "Geometries",
    "title": "Gadfly.Geom.boxplot",
    "category": "type",
    "text": "Geom.boxplot[(; method=:tukey, suppress_outliers=false)]\n\nDraw box plots of the middle, lower_hinge, upper_hinge, lower_fence, upper_fence, and outliers aesthetics.  The categorical x aesthetic is optional.  If suppress_outliers is true, don\'t draw points indicating outliers.\n\nAlternatively, if the y aesthetic is specified instead, the middle, hinges, fences, and outliers aesthetics will be computed using Stat.boxplot.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.errorbar",
    "page": "Geometries",
    "title": "Gadfly.Geom.errorbar",
    "category": "type",
    "text": "Geom.errorbar\n\nDraw vertical error bars if the x, ymin, and ymax aesthetics are specified and/or horizontal error bars for y, xmin, and xmax. Optionally color them with color.\n\nSee also Geom.xerrorbar and Geom.yerrorbar.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.hexbin",
    "page": "Geometries",
    "title": "Gadfly.Geom.hexbin",
    "category": "type",
    "text": "Geom.hexbin[(; xbincount=200, ybincount=200)]\n\nBin the x and y aesthetics into tiled hexagons and color by count. xbincount and ybincount specify the number of bins.  This behavior relies on the default use of Stat.hexbin.\n\nAlternatively, draw hexagons of size xsize and ysize at positions x and y by passing Stat.identity to plot and manually binding the color aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.hline",
    "page": "Geometries",
    "title": "Gadfly.Geom.hline",
    "category": "type",
    "text": "Geom.hline[(; color=nothing, size=nothing, style=nothing)]\n\nDraw horizontal lines across the plot canvas at each position in the yintercept aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.label",
    "page": "Geometries",
    "title": "Gadfly.Geom.label",
    "category": "type",
    "text": "Geom.label[(; position=:dynamic, hide_overlaps=true)]\n\nPlace the text strings in the label aesthetic at the x and y coordinates on the plot frame.  Offset the text according to position, which can be :left, :right, :above, :below, :centered, or :dynamic.  The latter tries a variety of positions for each label to minimize the number that overlap.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.line",
    "page": "Geometries",
    "title": "Gadfly.Geom.line",
    "category": "type",
    "text": "Geom.line[(; preserve_order=false, order=2)]\n\nDraw a line connecting the x and y coordinates.  Optionally plot multiple lines according to the group or color aesthetics.  order controls whether the lines(s) are underneath or on top of other forms.\n\nSet preserve_order to :true to not sort the points according to their position along the x axis, or use the equivalent Geom.path alias.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.point",
    "page": "Geometries",
    "title": "Gadfly.Geom.point",
    "category": "type",
    "text": "Geom.point\n\nDraw scatter plots of the x and y aesthetics.\n\nOptional Aesthetics\n\ncolor: Categorical data will choose maximally distinguishable colors from the LCHab color space.  Continuous data will map onto LCHab as well.  Colors can also be specified explicitly for each data point with a vector of colors of length(x).  A vector of length one specifies the color to use for all points. Default is Theme.default_color.\nshape: Categorical data will cycle through Theme.point_shapes.  Shapes can also be specified explicitly for each data point with a vector of shapes of length(x).  A vector of length one specifies the shape to use for all points. Default is Theme.point_shapes[1].\nsize: Categorical data and vectors of Ints will interpolate between Theme.point_size_{min,max}.  A continuous vector of AbstractFloats or Measures of length(x) specifies the size of each data point explicitly.  A vector of length one specifies the size to use for all points.  Default is Theme.point_size.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.polygon",
    "page": "Geometries",
    "title": "Gadfly.Geom.polygon",
    "category": "type",
    "text": "Geom.polygon[(; order=0, fill=false, preserve_order=false)]\n\nDraw polygons with vertices specified by the x and y aesthetics. Optionally plot multiple polygons according to the group, color and/or linestyle aesthetics.  order controls whether the polygon(s) are underneath or on top of other forms.  If fill=true, fill the polygons using Theme.lowlight_color and stroke the polygons using Theme.discrete_highlight_color. If fill=false stroke the polygons using Theme.lowlight_color and Theme.line_style. If preserve_order=true connect points in the order they are given, otherwise order the points around their centroid.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.rectbin",
    "page": "Geometries",
    "title": "Gadfly.Geom.rectbin",
    "category": "type",
    "text": "Geom.rectbin\n\nDraw equal sizes rectangles centered at x and y positions.  Optionally specify their color.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.ribbon",
    "page": "Geometries",
    "title": "Gadfly.Geom.ribbon",
    "category": "type",
    "text": "Geom.ribbon\n\nDraw a ribbon at the positions in x bounded above and below by ymax and ymin, respectively.  Optionally draw multiple ribbons by grouping with color.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.segment",
    "page": "Geometries",
    "title": "Gadfly.Geom.segment",
    "category": "type",
    "text": "Geom.segment[(; arrow=false, filled=false)]\n\nDraw line segments from x, y to xend, yend.  Optionally specify their color.  If arrow is true a Scale object for both axes must be provided.  If filled is true the arrows are drawn with a filled polygon, otherwise with a stroked line.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.subplot_grid",
    "page": "Geometries",
    "title": "Gadfly.Geom.subplot_grid",
    "category": "type",
    "text": "Geom.subplot_grid[(elements...)]\n\nDraw multiple subplots in a grid organized by one or two categorial vectors.\n\nOptional Aesthetics\n\nxgroup, ygroup: Arrange subplots on the X and Y axes, respectively, by categorial data.\nfree_x_axis, free_y_axis: Whether the X and Y axis scales, respectively, can differ across the subplots. Defaults to false. If true, scales are set appropriately for individual subplots.\n\nOne or both of xgroup or ygroup must be bound. If only one, a single column or row of subplots is drawn, if both, a grid.\n\nArguments\n\nUnlike most geometries, Geom.subplot_grid is typically passed one or more parameters. The constructor works for the most part like the layer function. Arbitrary plot elements may be passed, while aesthetic bindings are inherited from the parent plot.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.violin",
    "page": "Geometries",
    "title": "Gadfly.Geom.violin",
    "category": "type",
    "text": "Geom.violin[(; order=1)]\n\nDraw y versus width, optionally grouping categorically by x and coloring with color.  Alternatively, if width is not supplied, the data in y will be transformed to a density estimate using Stat.violin\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.vline",
    "page": "Geometries",
    "title": "Gadfly.Geom.vline",
    "category": "type",
    "text": "Geom.vline[(; color=nothing, size=nothing, style=nothing)]\n\nDraw vertical lines across the plot canvas at each position in the xintercept aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.xerrorbar",
    "page": "Geometries",
    "title": "Gadfly.Geom.xerrorbar",
    "category": "type",
    "text": "Geom.xerrorbar\n\nDraw horizontal error bars at y from xmin to xmax.  Optionally color them with color.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.yerrorbar",
    "page": "Geometries",
    "title": "Gadfly.Geom.yerrorbar",
    "category": "type",
    "text": "Geom.yerrorbar\n\nDraw vertical error bars at x from ymin to ymax.  Optionally color them with color.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.contour-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.contour",
    "category": "method",
    "text": "Geom.contours[(; levels=15, samples=150, preserve_order=true)]\n\nDraw contour lines of the 2D function, matrix, or DataFrame in the z aesthetic.  This geometry is equivalent to Geom.line with Stat.contour; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.density-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.density",
    "category": "method",
    "text": "Geom.density[(; bandwidth=-Inf)]\n\nDraw a line showing the density estimate of the x aesthetic. This geometry is equivalent to Geom.line with Stat.density; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.density2d-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.density2d",
    "category": "method",
    "text": "Geom.density2d[(; bandwidth=(-Inf,-Inf), levels=15)]\n\nDraw a set of contours showing the density estimate of the x and y aesthetics.  This geometry is equivalent to Geom.line with Stat.density2d; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.ellipse-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.ellipse",
    "category": "method",
    "text": "Geom.ellipse[(; distribution=MvNormal, levels=[0.95], nsegments=51, fill=false)]\n\nDraw a confidence ellipse, using a parametric multivariate distribution, for a scatter of points specified by the x and y aesthetics.  Optionally plot multiple ellipses according to the group and/or color aesthetics. levels are auto-mapped to the linestyle aesthetic. This geometry is equivalent to Geom.polygon with Stat.ellipse; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.hair-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.hair",
    "category": "method",
    "text": "Geom.hair[(; intercept=0.0, orientation=:vertical)]\n\nDraw lines from x, y to y=intercept if orientation is :vertical or x=intercept if :horizontal.  Optionally specify their color.  This geometry is equivalent to Geom.segment with Stat.hair.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.histogram-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.histogram",
    "category": "method",
    "text": "Geom.histogram[(; position=:stack, bincount=nothing, minbincount=3, maxbincount=150,\n                orientation=:vertical, density=false)]\n\nDraw histograms from a series of observations in x or y optionally grouping by color.  This geometry is equivalent to Geom.bar with Stat.histogram; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.histogram2d-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.histogram2d",
    "category": "method",
    "text": "Geom.histogram2d[(; xbincount=nothing, xminbincount=3, xmaxbincount=150,\n                    ybincount=nothing, yminbincount=3, ymaxbincount=150)]\n\nDraw a heatmap of the x and y aesthetics by binning into rectangles and indicating density with color.  This geometry is equivalent to Geom.rect with Stat.histogram2d;  see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.path-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.path",
    "category": "method",
    "text": "Geom.path\n\nDraw lines between x and y points in the order they are listed.  This geometry is equivalent to Geom.line with preserve_order=true.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.rect-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.rect",
    "category": "method",
    "text": "Geom.rect\n\nDraw colored rectangles with the corners specified by the xmin, xmax, ymin and ymax aesthetics.  Optionally specify their color.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.smooth-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.smooth",
    "category": "method",
    "text": "Geom.smooth[(; method:loess, smoothing=0.75)]\n\nPlot a smooth function estimated from the line described by x and y aesthetics.  Optionally group by color and plot multiple independent smooth lines.  This geometry is equivalent to Geom.line with Stat.smooth; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.step-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.step",
    "category": "method",
    "text": "Geom.step[(; direction=:hv)]\n\nConnect points described by the x and y aesthetics using a stepwise function.  Optionally group by color or group.  This geometry is equivalent to Geom.line with Stat.step; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.vector-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.vector",
    "category": "method",
    "text": "Geom.vector[(; filled=false)]\n\nThis geometry is equivalent to Geom.segment(arrow=true).\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#Gadfly.Geom.vectorfield-Tuple{}",
    "page": "Geometries",
    "title": "Gadfly.Geom.vectorfield",
    "category": "method",
    "text": "Geom.vectorfield[(; smoothness=1.0, scale=1.0, samples=20, filled=false)]\n\nDraw a gradient vector field of the 2D function or a matrix in the z aesthetic.  This geometry is equivalent to Geom.segment with Stat.vectorfield; see the latter for more information.\n\n\n\n\n\n"
},

{
    "location": "lib/geometries/#lib_geom-1",
    "page": "Geometries",
    "title": "Geometries",
    "category": "section",
    "text": "Geometries are responsible for actually doing the drawing. A geometry takes as input one or more aesthetics, and use data bound to these aesthetics to draw things. For instance, the Geom.point geometry draws points using the x and y aesthetics, while the Geom.line geometry draws lines with those same two aesthetics.Core geometries:Modules = [Geom]\nOrder = [:type]Derived geometries build on core geometries by automatically applying a default statistic:Modules = [Geom]\nOrder = [:function]Modules = [Geom]"
},

{
    "location": "lib/guides/#",
    "page": "Guides",
    "title": "Guides",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/guides/#Gadfly.Guide.annotation",
    "page": "Guides",
    "title": "Gadfly.Guide.annotation",
    "category": "type",
    "text": "Guide.annotation(ctx::Compose.Context)\n\nOverlay a plot with an arbitrary Compose graphic. The context will inherit the plot\'s coordinate system, unless overridden with a custom unit box.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.colorkey",
    "page": "Guides",
    "title": "Gadfly.Guide.colorkey",
    "category": "type",
    "text": "Guide.colorkey[(; title=nothing, labels=nothing, pos=nothing)]\nGuide.colorkey(title, labels, pos)\n\nEnable control of the auto-generated colorkey.  Set the colorkey title for any plot, and the item labels for plots with a discrete color scale.  pos overrides Theme(key_position=) and can be in either relative (e.g. [0.7w, 0.2h] is the lower right quadrant), absolute (e.g. [0mm, 0mm]), or plot scale (e.g. [0,0]) coordinates.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.manual_color_key",
    "page": "Guides",
    "title": "Gadfly.Guide.manual_color_key",
    "category": "type",
    "text": "Guide.manual_color_key(title, labels, colors)\n\nManually define a color key with the legend title and item labels and colors.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.shapekey",
    "page": "Guides",
    "title": "Gadfly.Guide.shapekey",
    "category": "type",
    "text": "Guide.shapekey[(; title=\"Shape\", labels=[\"\"], pos=Float64[])]\nGuide.shapekey(title, labels, pos)\n\nEnable control of the auto-generated shapekey.  Set the key title and the item labels. pos overrides Theme(key_position=) and can be in either relative (e.g. [0.7w, 0.2h] is the lower right quadrant), absolute (e.g. [0mm, 0mm]), or plot scale (e.g. [0,0]) coordinates.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.title",
    "page": "Guides",
    "title": "Gadfly.Guide.title",
    "category": "type",
    "text": "Geom.title(title)\n\nSet the plot title.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.xlabel",
    "page": "Guides",
    "title": "Gadfly.Guide.xlabel",
    "category": "type",
    "text": "Guide.xlabel(label, orientation=:auto)\n\nSets the x-axis label for the plot.  label is either a String or nothing. orientation can also be :horizontal or :vertical.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.xrug",
    "page": "Guides",
    "title": "Gadfly.Guide.xrug",
    "category": "type",
    "text": "Guide.xrug\n\nDraw a short vertical lines along the x-axis of a plot at the positions in the x aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.xticks",
    "page": "Guides",
    "title": "Gadfly.Guide.xticks",
    "category": "type",
    "text": "Guide.xticks[(; label=true, ticks=:auto, orientation=:auto)]\nGuide.xticks(label, ticks, orientation)\n\nFormats the tick marks and labels for the x-axis.  label toggles the label visibility.  ticks can also be an array of locations, or nothing. orientation can also be :horizontal or :vertical.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.ylabel",
    "page": "Guides",
    "title": "Gadfly.Guide.ylabel",
    "category": "type",
    "text": "Guide.ylabel(label, orientation=:auto)\n\nSets the y-axis label for the plot.  label is either a String or nothing. orientation can also be :horizontal or :vertical.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.yrug",
    "page": "Guides",
    "title": "Gadfly.Guide.yrug",
    "category": "type",
    "text": "Guide.yrug\n\nDraw short horizontal lines along the y-axis of a plot at the positions in the \'y\' aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#Gadfly.Guide.yticks",
    "page": "Guides",
    "title": "Gadfly.Guide.yticks",
    "category": "type",
    "text": "Guide.yticks[(; label=true, ticks=:auto, orientation=:horizontal)]\nGuide.yticks(ticks, label, orientation)\n\nFormats the tick marks and labels for the y-axis.  label toggles the label visibility.  ticks can also be an array of locations, or nothing. orientation can also be :auto or :vertical.\n\n\n\n\n\n"
},

{
    "location": "lib/guides/#lib_guide-1",
    "page": "Guides",
    "title": "Guides",
    "category": "section",
    "text": "Very similar to Geometries are guides, which draw graphics supporting the actual visualization, such as axis ticks, axis labels, and color keys. The major distinction is that geometries always draw within the rectangular plot frame, while guides have some special layout considerations.Modules = [Guide]Modules = [Guide]"
},

{
    "location": "lib/statistics/#",
    "page": "Statistics",
    "title": "Statistics",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/statistics/#Gadfly.Stat.xticks-Tuple{}",
    "page": "Statistics",
    "title": "Gadfly.Stat.xticks",
    "category": "method",
    "text": "Stat.xticks[(; ticks=:auto, granularity_weight=1/4, simplicity_weight=1/6,\n            coverage_weight=1/3, niceness_weight=1/4)]\n\nCompute an appealing set of x-ticks that encompass the data by transforming the x, xmin, xmax and xintercept aesthetics into the xtick and xgrid aesthetics.  ticks is a vector of desired values, or :auto to indicate they should be computed.  the importance of having a reasonable number of ticks is specified with granularity_weight; of including zero with simplicity_weight; of tightly fitting the span of the data with coverage_weight; and of having a nice numbering with niceness_weight.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.yticks-Tuple{}",
    "page": "Statistics",
    "title": "Gadfly.Stat.yticks",
    "category": "method",
    "text": "Stat.yticks[(; ticks=:auto, granularity_weight=1/4, simplicity_weight=1/6,\n            coverage_weight=1/3, niceness_weight=1/4)]\n\nCompute an appealing set of y-ticks that encompass the data by transforming the y, ymin, ymax, yintercept, middle, lower_hinge, upper_hinge, lower_fence and upper_fence aesthetics into the ytick and ygrid aesthetics.  ticks is a vector of desired values, or :auto to indicate they should be computed.  the importance of having a reasonable number of ticks is specified with granularity_weight; of including zero with simplicity_weight; of tightly fitting the span of the data with coverage_weight; and of having a nice numbering with niceness_weight.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.bar",
    "page": "Statistics",
    "title": "Gadfly.Stat.bar",
    "category": "type",
    "text": "Stat.bar[(; position=:stack, orientation=:vertical)]\n\nTransform the x aesthetic into the xmin and xmax aesthetics.  Used by Geom.bar.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.binmean",
    "page": "Statistics",
    "title": "Gadfly.Stat.binmean",
    "category": "type",
    "text": "Stat.binmean[(; n=20)]\n\nTransform the the x and y aesthetics into n bins each of which contains the mean within than bin.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.boxplot",
    "page": "Statistics",
    "title": "Gadfly.Stat.boxplot",
    "category": "type",
    "text": "Stat.boxplot[(; method=:tukey)]\n\nTransform the the x and y aesthetics into the x, middle, lower_hinge, upper_hinge, lower_fence, upper_fence and outliers aesthetics.  If method is :tukey then Tukey\'s rule is used (i.e. fences are 1.5 times the inter-quartile range).  Otherwise, method should be a vector of five numbers giving quantiles for lower fence, lower hinge, middle, upper hinge, and upper fence in that order.  Used by Geom.boxplot.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.contour",
    "page": "Statistics",
    "title": "Gadfly.Stat.contour",
    "category": "type",
    "text": "Stat.contour[(; levels=15, samples=150)]\n\nTransform the 2D function, matrix, or DataFrame in the z aesthetic into a set of lines in x and y showing the iso-level contours.  A function requires that either the x and y or the xmin, xmax, ymin and ymax aesthetics also be defined.  The latter are interpolated using samples.  A matrix and DataFrame can optionally input x and y aesthetics to specify the coordinates of the rows and columns, respectively.  In each case levels sets the number of contours to draw:  either a vector of contour levels, an integer that specifies the number of contours to draw, or a function which inputs z and outputs either a vector or an integer.  Used by Geom.contour.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.density",
    "page": "Statistics",
    "title": "Gadfly.Stat.density",
    "category": "type",
    "text": "Stat.density[(; n=256, bandwidth=-Inf)]\n\nEstimate the density of x at n points, and put the result in x and y. Smoothing is controlled by bandwidth.  Used by Geom.density.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.density2d",
    "page": "Statistics",
    "title": "Gadfly.Stat.density2d",
    "category": "type",
    "text": "Stat.density2d[(; n=(256,256), bandwidth=(-Inf,-Inf), levels=15)]\n\nEstimate the density of the x and y aesthetics at n points and put the results into the x, y and z aesthetics.  Smoothing is controlled by bandwidth.  Calls Stat.contour to compute the levels.  Used by Geom.density2d.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.ellipse",
    "page": "Statistics",
    "title": "Gadfly.Stat.ellipse",
    "category": "type",
    "text": "Stat.ellipse[(; distribution=MvNormal, levels=[0.95], nsegments=51)]\n\nTransform the points in the x and y aesthetics into set of a lines in the x and y aesthetics.  distribution specifies a multivariate distribution to use; levels the quantiles for which confidence ellipses are calculated; and nsegments the number of segments with which to draw each ellipse.  Used by Geom.ellipse.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.func",
    "page": "Statistics",
    "title": "Gadfly.Stat.func",
    "category": "type",
    "text": "Stat.func[(; num_samples=250)]\n\nTransform the functions or expressions in the y, xmin and xmax aesthetics into points in the x, y and group aesthetics.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.hair",
    "page": "Statistics",
    "title": "Gadfly.Stat.hair",
    "category": "type",
    "text": "Stat.hair[(; intercept=0.0, orientation=:vertical)]\n\nTransform points in the x and y aesthetics into lines in the x, y, xend and yend aesthetics.  Used by Geom.hair.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.hexbin",
    "page": "Statistics",
    "title": "Gadfly.Stat.hexbin",
    "category": "type",
    "text": "Stat.hexbin[(; xbincount=50, ybincount=50)]\n\nBin the points in the x and y aesthetics into hexagons in the x, y, xsize and ysize aesthetics.  xbincount and ybincount manually fix the number of bins.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.histogram",
    "page": "Statistics",
    "title": "Gadfly.Stat.histogram",
    "category": "type",
    "text": "Stat.histogram[(; bincount=nothing, minbincount=3, maxbincount=150,\n                position=:stack, orientation=:vertical, density=false)]\n\nTransform the x aesthetic into the x, y, xmin and xmax aesthetics, optionally grouping by color. Exchange y for x when orientation is :horizontal.  bincount specifies the number of bins to use.  If set to nothing, an optimization method is used to determine a reasonable value which uses minbincount and maxbincount to set the lower and upper limits.  If density is true, normalize the counts by their total.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.histogram2d",
    "page": "Statistics",
    "title": "Gadfly.Stat.histogram2d",
    "category": "type",
    "text": "Stat.histogram2d[(; xbincount=nothing, xminbincount=3, xmaxbincount=150,\n                    ybincount=nothing, yminbincount=3, ymaxbincount=150)]\n\nBin the points in the x and y aesthetics into rectangles in the xmin, ymax, ymin, ymax and color aesthetics.  xbincount and ybincount manually fix the number of bins.  If set to nothing, an optimization method is used to determine a reasonable value which uses xminbincount, xmaxbincount, yminbincount and ymaxbincount to set the lower and upper limits.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.identity",
    "page": "Statistics",
    "title": "Gadfly.Stat.identity",
    "category": "type",
    "text": "Stat.identity\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.nil",
    "page": "Statistics",
    "title": "Gadfly.Stat.nil",
    "category": "type",
    "text": "Stat.Nil\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.qq",
    "page": "Statistics",
    "title": "Gadfly.Stat.qq",
    "category": "type",
    "text": "Stat.qq\n\nTransform the x and y aesthetics into cumulative distrubutions. If each is a numeric vector, their sample quantiles will be compared.  If one is a Distribution, then its theoretical quantiles will be compared with the sample quantiles of the other.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.rectbin",
    "page": "Statistics",
    "title": "Gadfly.Stat.rectbin",
    "category": "type",
    "text": "Stat.rectbin\n\nTransform the x and y aesthetics into the xmin, xmax, ymin and ymax aesthetics.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.smooth",
    "page": "Statistics",
    "title": "Gadfly.Stat.smooth",
    "category": "type",
    "text": "Stat.smooth[(; method=:loess, smoothing=0.75, levels=[0.95])]\n\nTransform the x and y aesthetics into the x, y, ymin and ymax aesthetics.  method can either be:loess or :lm.  smoothing controls the degree of smoothing.  For :loess, this is the span parameter giving the proportion of data used for each local fit where 0.75 is the default. Larger values use more data (less local context), smaller values use less data (more local context).  levels is a vector of quantiles  at which confidence bands are calculated (currently for method=:lm only). For confidence bands, use Stat.smooth() with Geom.ribbon.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.step",
    "page": "Statistics",
    "title": "Gadfly.Stat.step",
    "category": "type",
    "text": "Stat.step[(; direction=:hv)]\n\nPerform stepwise interpolation between the points in the x and y aesthetics.  If direction is :hv a horizontal line extends to the right of each point and a vertical line below it;  if :vh then vertical above and horizontal to the left.  More concretely, between (x[i], y[i]) and (x[i+1], y[i+1]), either (x[i+1], y[i]) or (x[i], y[i+1]) is inserted, for :hv and :vh, respectively.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.vectorfield",
    "page": "Statistics",
    "title": "Gadfly.Stat.vectorfield",
    "category": "type",
    "text": "Stat.vectorfield[(; smoothness=1.0, scale=1.0, samples=20)]\n\nTransform the 2D function or matrix in the z aesthetic into a set of lines from x, y to xend, yend showing the gradient vectors.  A function requires that either the x and y or the xmin, xmax, ymin and ymax aesthetics also be defined.  The latter are interpolated using samples.  A matrix can optionally input x and y aesthetics to specify the coordinates of the rows and columns, respectively.  In each case, smoothness can vary from 0 to Inf;  and scale sets the size of vectors.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.violin",
    "page": "Statistics",
    "title": "Gadfly.Stat.violin",
    "category": "type",
    "text": "Stat.violin[(n=300)]\n\nTransform the x, y and color aesthetics.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.x_jitter-Tuple{}",
    "page": "Statistics",
    "title": "Gadfly.Stat.x_jitter",
    "category": "method",
    "text": "Stat.x_jitter[(; range=0.8, seed=0x0af5a1f7)]\n\nAdd a random number to the x aesthetic, which is typically categorical, to reduce the likelihood that points overlap.  The maximum jitter is range times the smallest non-zero difference between two points.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#Gadfly.Stat.y_jitter-Tuple{}",
    "page": "Statistics",
    "title": "Gadfly.Stat.y_jitter",
    "category": "method",
    "text": "Stat.y_jitter[(; range=0.8, seed=0x0af5a1f7)]\n\nAdd a random number to the y aesthetic, which is typically categorical, to reduce the likelihood that points overlap.  The maximum jitter is range times the smallest non-zero difference between two points.\n\n\n\n\n\n"
},

{
    "location": "lib/statistics/#lib_stat-1",
    "page": "Statistics",
    "title": "Statistics",
    "category": "section",
    "text": "Statistics are functions taking as input one or more aesthetics, operating on those values, then outputting to one or more aesthetics. For example, drawing of boxplots typically uses the boxplot statistic (Stat.boxplot) that takes as input the x and y aesthetic, and outputs the middle, and upper and lower hinge, and upper and lower fence aesthetics.Modules = [Stat]Modules = [Stat]"
},

{
    "location": "lib/coordinates/#",
    "page": "Coordinates",
    "title": "Coordinates",
    "category": "page",
    "text": "Author = \"Tamas Nagy\""
},

{
    "location": "lib/coordinates/#Gadfly.Coord.cartesian",
    "page": "Coordinates",
    "title": "Gadfly.Coord.cartesian",
    "category": "type",
    "text": "Coord.cartesian(; xmin=nothing, xmax=nothing, ymin=nothing, ymax=nothing,\n                xflip=false, yflip=false,\n                aspect_ratio=nothing, fixed=false,\n                raster=false)\n\nxmin, xmax, ymin, and ymax specify hard minimum and maximum values on the x and y axes, and override the soft limits in Scale.x_continuous and Scale.y_continuous.  if xflip or yflip are true the respective axis is flipped.  aspect_ratio fulfills its namesake if not nothing, unless overridden by a fixed value of true, in which case the aspect ratio follows the units of the plot (e.g. if the y-axis is 5 units high and the x-axis in 10 units across, the plot will be drawn at an aspect ratio of 2).\n\n\n\n\n\n"
},

{
    "location": "lib/coordinates/#lib_coord-1",
    "page": "Coordinates",
    "title": "Coordinates",
    "category": "section",
    "text": "Coordinate systems are mappings between a coordinate space and the 2D rendered output.  Currently there is only 2D Cartesian, but this would be the mechanism to implement polar, barycentric, etc. and even projections of their 3D counterparts.Modules = [Coord]Modules = [Coord]"
},

{
    "location": "lib/scales/#",
    "page": "Scales",
    "title": "Scales",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales/#Gadfly.Scale.color_identity",
    "page": "Scales",
    "title": "Gadfly.Scale.color_identity",
    "category": "type",
    "text": "color_identity\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_none",
    "page": "Scales",
    "title": "Gadfly.Scale.color_none",
    "category": "type",
    "text": "color_none\n\nSuppress the default color scale that some statistics impose by setting the color aesthetic to nothing.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.label",
    "page": "Scales",
    "title": "Gadfly.Scale.label",
    "category": "type",
    "text": "label\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_asinh",
    "page": "Scales",
    "title": "Gadfly.Scale.color_asinh",
    "category": "function",
    "text": "color_asinh[(; minvalue=nothing, maxvalue=nothing, colormap)]\n\nSimilar to Scale.color_continuous, except that color is asinh transformed.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_continuous",
    "page": "Scales",
    "title": "Gadfly.Scale.color_continuous",
    "category": "function",
    "text": "color_continuous[(; minvalue=nothing, maxvalue=nothing, colormap)]\n\nCreate a continuous color scale by mapping the color aesthetic to a Color.  minvalue and maxvalue specify the data values corresponding to the bottom and top of the color scale.  colormap is a function defined on the interval from 0 to 1 that returns a Color.\n\nEither input Stat.color_continuous as an argument to plot, or set continuous_color_scale in a Theme.\n\nSee also color_log10, color_log2, color_log, color_asinh, and color_sqrt.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_discrete_hue",
    "page": "Scales",
    "title": "Gadfly.Scale.color_discrete_hue",
    "category": "function",
    "text": "color_discrete_hue[(f; levels=nothing, order=nothing, preserve_order=true)]\n\nCreate a discrete color scale that maps the categorical levels in the color aesthetic to Colors.  f is a function that produces a vector of colors. levels gives values for the scale.  Order will be respected and anything in the data that\'s not represented in levels will be set to missing.  order is a vector of integers giving a permutation of the levels default order.  If preserve_order is true orders levels as they appear in the data.\n\nEither input Stat.color_discrete_hue as an argument to plot, or set discrete_color_scale in a Theme.\n\nExamples\n\njulia> x = Scale.color_discrete_hue()\nGadfly.Scale.DiscreteColorScale(Gadfly.Scale.default_discrete_colors, nothing, nothing, true)\n\njulia> x.f(3)\n3-element Array{ColorTypes.Color,1}:\n LCHab{Float32}(70.0,60.0,240.0)        \n LCHab{Float32}(80.0,70.0,100.435)      \n LCHab{Float32}(65.8994,62.2146,353.998)\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_discrete_manual-Tuple{Vararg{AbstractString,N} where N}",
    "page": "Scales",
    "title": "Gadfly.Scale.color_discrete_manual",
    "category": "method",
    "text": "color_discrete_manual(colors...; levels=nothing, order=nothing)\n\nSimilar to color_discrete_hue except that colors for each level are specified directly instead of being computed by a function.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_log",
    "page": "Scales",
    "title": "Gadfly.Scale.color_log",
    "category": "function",
    "text": "color_log[(; minvalue=nothing, maxvalue=nothing, colormap)]\n\nSimilar to Scale.color_continuous, except that color is log transformed.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_log10",
    "page": "Scales",
    "title": "Gadfly.Scale.color_log10",
    "category": "function",
    "text": "color_log10[(; minvalue=nothing, maxvalue=nothing, colormap)]\n\nSimilar to Scale.color_continuous, except that color is log10 transformed.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_log2",
    "page": "Scales",
    "title": "Gadfly.Scale.color_log2",
    "category": "function",
    "text": "color_log2[(; minvalue=nothing, maxvalue=nothing, colormap)]\n\nSimilar to Scale.color_continuous, except that color is log2 transformed.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.color_sqrt",
    "page": "Scales",
    "title": "Gadfly.Scale.color_sqrt",
    "category": "function",
    "text": "color_sqrt[(; minvalue=nothing, maxvalue=nothing, colormap)]\n\nSimilar to Scale.color_continuous, except that color is sqrt transformed.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.group_discrete-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.group_discrete",
    "category": "method",
    "text": "group_discrete[(; labels=nothing, levels=nothing, order=nothing)]\n\nSimilar to Scale.x_discrete, except applied to the group aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.lab_gradient-Tuple{Vararg{ColorTypes.Color,N} where N}",
    "page": "Scales",
    "title": "Gadfly.Scale.lab_gradient",
    "category": "method",
    "text": "function lab_gradient(cs::Color...)\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.lab_rainbow-NTuple{4,Any}",
    "page": "Scales",
    "title": "Gadfly.Scale.lab_rainbow",
    "category": "method",
    "text": "lab_rainbow(l, c, h0, n)\n\nGenerate n colors in the LCHab colorspace by using a fixed luminance l and chroma c, and varying the hue, starting at h0.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.lchabmix-NTuple{4,Any}",
    "page": "Scales",
    "title": "Gadfly.Scale.lchabmix",
    "category": "method",
    "text": "function lchabmix(c0_, c1_, r, power)\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.linestyle_discrete-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.linestyle_discrete",
    "category": "method",
    "text": "linestyle_discrete[(; labels=nothing, levels=nothing, order=nothing)]\n\nSimilar to Scale.x_discrete, except applied to the linestyle aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.luv_rainbow-NTuple{4,Any}",
    "page": "Scales",
    "title": "Gadfly.Scale.luv_rainbow",
    "category": "method",
    "text": "luv_rainbow(l, c, h0, n)\n\nGenerate n colors in the LCHuv colorspace by using a fixed luminance l and chroma c, and varying the hue, starting at h0.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.shape_discrete-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.shape_discrete",
    "category": "method",
    "text": "shape_discrete[(; labels=nothing, levels=nothing, order=nothing)]\n\nSimilar to Scale.x_discrete, except applied to the shape aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.shape_identity-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.shape_identity",
    "category": "method",
    "text": "shape_identity()\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.size_continuous",
    "page": "Scales",
    "title": "Gadfly.Scale.size_continuous",
    "category": "function",
    "text": "size_continuous[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                 format=nothing, minticks=2, maxticks=10, scalable=true)]\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.size_discrete-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.size_discrete",
    "category": "method",
    "text": "size_discrete[(; labels=nothing, levels=nothing, order=nothing)]\n\nSimilar to Scale.x_discrete, except applied to the size aesthetic.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.size_identity-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.size_identity",
    "category": "method",
    "text": "size_identity()\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.slope_continuous",
    "page": "Scales",
    "title": "Gadfly.Scale.slope_continuous",
    "category": "function",
    "text": "slope_continuous[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                 format=nothing, minticks=2, maxticks=10, scalable=true)]\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.weighted_color_mean-Union{Tuple{T}, Tuple{S}, Tuple{AbstractArray{Lab{T},1},AbstractArray{S,1}}} where T where S<:Number",
    "page": "Scales",
    "title": "Gadfly.Scale.weighted_color_mean",
    "category": "method",
    "text": "function weighted_color_mean(cs::AbstractArray{Lab{T},1},\n                             ws::AbstractArray{S,1}) where {S <: Number,T}\n\nReturn the mean of Lab colors cs as weighted by ws.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_asinh",
    "page": "Scales",
    "title": "Gadfly.Scale.x_asinh",
    "category": "function",
    "text": "x_asinh[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.x_continuous, except that the aesthetics are asinh transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_continuous",
    "page": "Scales",
    "title": "Gadfly.Scale.x_continuous",
    "category": "function",
    "text": "x_continuous[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nMap the x, xmin, xmax, xintercept, xviewmin, xviewmax and xend aesthetics to x positions in Cartesian coordinates, which are presumed to be numerical, using an identity transform.  minvalue and maxvalue set soft lower and upper bounds.  (Use Coord.cartesian to enforce a hard bound.)  labels is a function which maps a coordinate value to a string label.  format is one of :plain, :scientific, :engineering, or :auto. Set scalable to false to prevent zooming on this axis.  See also x_log10, x_log2, x_log, x_asinh, and x_sqrt for alternatives to the identity transform.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_discrete-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.x_discrete",
    "category": "method",
    "text": "x_discrete[(; labels=nothing, levels=nothing, order=nothing)]\n\nMap the x, xmin, xmax, xintercept, xviewmin, xviewmax and xend aesthetics, which are presumed to be categorical, to Cartesian coordinates. Unlike Scale.x_continuous, each unique x value will be mapped to equally spaced positions, regardless of value.\n\nBy default continuous scales are applied to numerical data. If data consists of numbers specifying categories, explicitly adding Scale.x_discrete is the easiest way to get that data to plot appropriately.\n\nlabels is either a function which maps a coordinate value to a string label, or a vector of strings of the same length as the number of unique values in the aesthetic.  levels gives values for the scale.  Order will be respected and anything in the data that\'s not respresented in levels will be set to missing.  order is a vector of integers giving a permutation of the levels default order.\n\nSee also group_discrete, shape_discrete,  size_discrete, and linestyle_discrete.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_distribution-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.x_distribution",
    "category": "method",
    "text": "x_distribution()\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_log",
    "page": "Scales",
    "title": "Gadfly.Scale.x_log",
    "category": "function",
    "text": "x_log[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.x_continuous, except that the aesthetics are log transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_log10",
    "page": "Scales",
    "title": "Gadfly.Scale.x_log10",
    "category": "function",
    "text": "x_log10[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.x_continuous, except that the aesthetics are log10 transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_log2",
    "page": "Scales",
    "title": "Gadfly.Scale.x_log2",
    "category": "function",
    "text": "x_log2[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.x_continuous, except that the aesthetics are log2 transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.x_sqrt",
    "page": "Scales",
    "title": "Gadfly.Scale.x_sqrt",
    "category": "function",
    "text": "x_sqrt[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.x_continuous, except that the aesthetics are sqrt transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.xgroup-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.xgroup",
    "category": "method",
    "text": "xgroup[(; labels=nothing, levels=nothing, order=nothing)]\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_asinh",
    "page": "Scales",
    "title": "Gadfly.Scale.y_asinh",
    "category": "function",
    "text": "y_asinh[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.y_continuous, except that the aesthetics are asinh transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_continuous",
    "page": "Scales",
    "title": "Gadfly.Scale.y_continuous",
    "category": "function",
    "text": "y_continuous[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nMap the y, ymin, ymax, yintercept, intercept, middle, upper_fence, lower_fence, upper_hinge, lower_hinge, yviewmin, yviewmax and yend aesthetics to y positions in Cartesian coordinates, which are presumed to be numerical, using an identity transform.  minvalue and maxvalue set soft lower and upper bounds.  (Use Coord.cartesian to enforce a hard bound.)  labels is a function which maps a coordinate value to a string label.  format is one of :plain, :scientific, :engineering, or :auto. Set scalable to false to prevent zooming on this axis.  See also y_log10, y_log2, y_log, y_asinh, and y_sqrt for alternatives to the identity transform.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_discrete-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.y_discrete",
    "category": "method",
    "text": "y_discrete[(; labels=nothing, levels=nothing, order=nothing)]\n\nMap the y, ymin, ymax, yintercept, intercept, middle, upper_fence, lower_fence, upper_hinge, lower_hinge, yviewmin, yviewmax and yend aesthetics, which are presumed to be categorical, to Cartesian coordinates. Unlike Scale.x_continuous, each unique y value will be mapped to equally spaced positions, regardless of value.\n\nBy default continuous scales are applied to numerical data. If data consists of numbers specifying categories, explicitly adding Scale.y_discrete is the easiest way to get that data to plot appropriately.\n\nlabels is either a function which maps a coordinate value to a string label, or a vector of strings of the same length as the number of unique values in the aesthetic.  levels gives values for the scale.  Order will be respected and anything in the data that\'s not respresented in levels will be set to missing.  order is a vector of integers giving a permutation of the levels default order.\n\nSee also group_discrete, shape_discrete,  size_discrete, and linestyle_discrete.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_distribution-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.y_distribution",
    "category": "method",
    "text": "y_distribution()\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_func-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.y_func",
    "category": "method",
    "text": "y_func()\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_log",
    "page": "Scales",
    "title": "Gadfly.Scale.y_log",
    "category": "function",
    "text": "y_log[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.y_continuous, except that the aesthetics are log transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_log10",
    "page": "Scales",
    "title": "Gadfly.Scale.y_log10",
    "category": "function",
    "text": "y_log10[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.y_continuous, except that the aesthetics are log10 transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_log2",
    "page": "Scales",
    "title": "Gadfly.Scale.y_log2",
    "category": "function",
    "text": "y_log2[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.y_continuous, except that the aesthetics are log2 transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.y_sqrt",
    "page": "Scales",
    "title": "Gadfly.Scale.y_sqrt",
    "category": "function",
    "text": "y_sqrt[(; minvalue=nothing, maxvalue=nothing, labels=nothing,\n                   format=nothing, minticks=2, maxticks=10, scalable=true)]\n\nSimilar to Scale.y_continuous, except that the aesthetics are sqrt transformed and the labels function inputs transformed values.\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.ygroup-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.ygroup",
    "category": "method",
    "text": "ygroup[(; labels=nothing, levels=nothing, order=nothing)]\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#Gadfly.Scale.z_func-Tuple{}",
    "page": "Scales",
    "title": "Gadfly.Scale.z_func",
    "category": "method",
    "text": "z_func()\n\n\n\n\n\n"
},

{
    "location": "lib/scales/#lib_scale-1",
    "page": "Scales",
    "title": "Scales",
    "category": "section",
    "text": "Scales, similarly to Statistics, apply a transformation to the original data, typically mapping one aesthetic to the same aesthetic, while retaining the original value. For example, the Scale.x_log10 aesthetic maps the  x aesthetic back to the x aesthetic after applying a log10 transformation, but keeps track of the original value so that data points are properly identified.Modules = [Scale]Modules = [Scale]"
},

{
    "location": "lib/shapes/#",
    "page": "Shapes",
    "title": "Shapes",
    "category": "page",
    "text": "Author = \"Ben J. Arthur\""
},

{
    "location": "lib/shapes/#Gadfly.Shape.cross-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.cross",
    "category": "method",
    "text": "cross(xs, ys, rs)\n\nDraw crosses at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.diamond-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.diamond",
    "category": "method",
    "text": "diamond(xs, ys, rs)\n\nDraw diamonds at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.dtriangle-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.dtriangle",
    "category": "method",
    "text": "dtriangle(xs, ys, rs)\n\nDraw downward-pointing triangles at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.hexagon-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.hexagon",
    "category": "method",
    "text": "hexagon(xs, ys, rs)\n\nDraw hexagons at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.hline-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.hline",
    "category": "method",
    "text": "hline(xs, ys, rs)\n\nDraw horizontal lines at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.octagon-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.octagon",
    "category": "method",
    "text": "octagon(xs, ys, rs)\n\nDraw octagons at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.square-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.square",
    "category": "method",
    "text": "square(xs, ys, rs)\n\nDraw squares at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.star1",
    "page": "Shapes",
    "title": "Gadfly.Shape.star1",
    "category": "function",
    "text": "star1(xs, ys, rs, scalar=1)\n\nDraw five-pointed stars at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.star2",
    "page": "Shapes",
    "title": "Gadfly.Shape.star2",
    "category": "function",
    "text": "star2(xs, ys, rs, scalar=1)\n\nDraw four-pointed stars at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.utriangle",
    "page": "Shapes",
    "title": "Gadfly.Shape.utriangle",
    "category": "function",
    "text": "utriangle(xs, ys, rs, scalar=1)\n\nDraw upward-pointing triangles at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.vline-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.vline",
    "category": "method",
    "text": "vline(xs, ys, rs)\n\nDraw vertical lines at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Gadfly.Shape.xcross-Tuple{AbstractArray,AbstractArray,AbstractArray}",
    "page": "Shapes",
    "title": "Gadfly.Shape.xcross",
    "category": "method",
    "text": "xcross(xs, ys, rs)\n\nDraw rotated crosses at the coordinates specified in xs and ys of size rs\n\n\n\n\n\n"
},

{
    "location": "lib/shapes/#Shapes-1",
    "page": "Shapes",
    "title": "Shapes",
    "category": "section",
    "text": "Shapes, when combined with Geom.point, specify the appearance of markers.  In addition to those below, circle is also imported from Compose.jl.Modules = [Shape]Modules = [Shape]"
},

{
    "location": "dev/pipeline/#",
    "page": "Rendering Pipeline",
    "title": "Rendering Pipeline",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "dev/pipeline/#Rendering-Pipeline-1",
    "page": "Rendering Pipeline",
    "title": "Rendering Pipeline",
    "category": "section",
    "text": "using DataFrames\nusing Colors\nusing Compose\nusing RDatasets\nusing Showoff\nusing GadflyHow does the function calldf = dataset(\"ggplot2\", \"diamonds\")\np = plot(df,\n         x = :Price, color = :Cut,\n		 Stat.histogram,\n		 Geom.bar)actually get turned into the following plot?df = dataset(\"ggplot2\", \"diamonds\")\np = plot(df,\n         x = :Price, color = :Cut,\n		 Stat.histogram,\n		 Geom.bar)p # hideThe rendering pipeline transforms a plot specification into a Compose scene graph that contains a set of guides (e.g. axis ticks, color keys) and one or more layers of geometry (e.g. points, lines). The specification of each layer hasa data source (e.g. dataset(\"ggplot2\", \"diamonds\"))\na geometry to represent the layer\'s data (e.g. point, line, etc.)\nmappings to associate aesthetics of the geometry with elements of the data source (e.g.  :color => :Cut)\nlayer-wise statistics (optional) to be applied to the layer\'s dataAll layers of a plot share the sameCoordinates for the geometry (e.g. cartesian, polar, etc.)\naxis Scales (e.g. loglog, semilog, etc.)\nplot-wise Statistics (optional) to be applied to all layers\nGuidesA full plot specification must describe these shared elements as well as all the layer specifications. In the example above, we see that only the data source, statistics, geometry, and mapping are specified. The missing elements are either inferred from the data (e.g. categorical values in df[:Cut] implies a discrete color scale), or assumed using defaults (e.g. continuous x-axis scale). For example, invoking plot with all the elements will look something likep = plot(layer(df,\n               x = :Price, color = :Cut,\n		       Stat.histogram,\n		       Geom.bar),\n	  	 Scale.x_continuous,\n		 Scale.color_discrete,\n		 Coord.cartesian,\n		 Guide.xticks, Guide.yticks,\n		 Guide.xlabel(\"Price\"),\n		 Guide.colorkey(title=\"Cut\"))Once a full plot specification is filled out, the rendering process proceeds as follows:(Image: )For each layer in the plot, we first map subsets of the data source to a Data object. The Price and Cut columns of the diamond dataset are mapped to the :x and :color fields of Data, respectively.\nScales are applied to the data to obtain plottable aesthetics. Scale.x_continuous keeps the values of df[:Price] unchanged, while Scale.color_discrete_hue maps the unique elements of df[:Cut] (an array of strings) to actual color values.\nThe aesthetics are transformed by layer-wise and plot-wise statistics, in order. Stat.histogram replaces the x field of the aesthetics with bin positions, and sets the y field with the corresponding counts.\nUsing the position aesthetics from all layers, we create a Compose context with a coordinate system that fits the data to screen coordinates. Coord.cartesian creates a Compose context that maps a vertical distance of 3000 counts to about two inches in the rendered plot.\nEach layer renders its own geometry.\nFinally, we compute the layout of the guides and render them on top of the plot context."
},

{
    "location": "dev/regression/#",
    "page": "Regression Testing",
    "title": "Regression Testing",
    "category": "page",
    "text": "Author = \"Ben Arthur\""
},

{
    "location": "dev/regression/#Regression-Testing-1",
    "page": "Regression Testing",
    "title": "Regression Testing",
    "category": "section",
    "text": "Running Pkg.test(\"Gadfly\") evaluates all of the files in Gadfly/test/testscripts.  Any errors or warnings are printed to the REPL.  In addition, the figures that are produced are put into either the devel-output/ or master-output/ sub-directories.  Nominally, the former represents the changes in a pull request while the latter are used for comparison. Specifically, runtests.jl examines the currently checked out git commit, and sets the output directory to master-output/ if it is the HEAD of the master branch or if it is detached.  Otherwise, it assumes you are at the tip of a development branch and saves the figures to devel-output/.  After running the tests on both of these branches, executing compare_examples.jl displays differences between the new and old figures.  This script can dump a diff of the files to the REPL, open both figures for manual comparison, and/or, for SVG and PNG files, display a black and white figure highlighting the spatial location of the differences.So the automated regression analysis workflow is then as follows:In a branch other than master,\ndevelop your new feature or fix your old bug,\ncommit all your changes,\nPkg.test(\"Gadfly\"),\ncheckout master,\nPkg.test again,\nPkg.add(\"ArgParse\") and, for B&W images, Cairo, Fontconfig, Rsvg, and Images as well,\ncheck for differences with julia test/compare_examples.jl [--diff] [--two] [--bw] [-h] [filter].  For example, julia test/compare_examples.jl --bw .js.svg will show black and white images highlighting the differences between the svg test images."
},

{
    "location": "dev/compose/#",
    "page": "Relationship with Compose.jl",
    "title": "Relationship with Compose.jl",
    "category": "page",
    "text": "Author = \"Ben Arthur\""
},

{
    "location": "dev/compose/#Relationship-with-Compose.jl-1",
    "page": "Relationship with Compose.jl",
    "title": "Relationship with Compose.jl",
    "category": "section",
    "text": "Gadfly and Compose are tightly intertwined.  As such, if you want to checkout the master branch of Gadfly to get the latest features and bug fixes, you\'ll likely also need to checkout Compose.Moreover, if you\'re a contributor, you should probably tag releases of Gadfly and Compose simultaneously, and ideally submit a single PR to METADATA containing both.  It is for this reason that neither uses attobot, as it has no mechanism to do this."
},

]}
