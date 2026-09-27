/*
 * highlight.js 11.11.1 with all 192 bundled grammars registered.
 *
 * Generated from the upstream lib/index.js registration list; the order is
 * kept as-is because some grammars depend on an earlier one being registered.
 */
import hljs from '#ehtml/showdown/extensions/highlight/core.js'
import lang_1c from '#ehtml/showdown/extensions/highlight/languages/1c.js'
import lang_abnf from '#ehtml/showdown/extensions/highlight/languages/abnf.js'
import lang_accesslog from '#ehtml/showdown/extensions/highlight/languages/accesslog.js'
import lang_actionscript from '#ehtml/showdown/extensions/highlight/languages/actionscript.js'
import lang_ada from '#ehtml/showdown/extensions/highlight/languages/ada.js'
import lang_angelscript from '#ehtml/showdown/extensions/highlight/languages/angelscript.js'
import lang_apache from '#ehtml/showdown/extensions/highlight/languages/apache.js'
import lang_applescript from '#ehtml/showdown/extensions/highlight/languages/applescript.js'
import lang_arcade from '#ehtml/showdown/extensions/highlight/languages/arcade.js'
import lang_arduino from '#ehtml/showdown/extensions/highlight/languages/arduino.js'
import lang_armasm from '#ehtml/showdown/extensions/highlight/languages/armasm.js'
import lang_xml from '#ehtml/showdown/extensions/highlight/languages/xml.js'
import lang_asciidoc from '#ehtml/showdown/extensions/highlight/languages/asciidoc.js'
import lang_aspectj from '#ehtml/showdown/extensions/highlight/languages/aspectj.js'
import lang_autohotkey from '#ehtml/showdown/extensions/highlight/languages/autohotkey.js'
import lang_autoit from '#ehtml/showdown/extensions/highlight/languages/autoit.js'
import lang_avrasm from '#ehtml/showdown/extensions/highlight/languages/avrasm.js'
import lang_awk from '#ehtml/showdown/extensions/highlight/languages/awk.js'
import lang_axapta from '#ehtml/showdown/extensions/highlight/languages/axapta.js'
import lang_bash from '#ehtml/showdown/extensions/highlight/languages/bash.js'
import lang_basic from '#ehtml/showdown/extensions/highlight/languages/basic.js'
import lang_bnf from '#ehtml/showdown/extensions/highlight/languages/bnf.js'
import lang_brainfuck from '#ehtml/showdown/extensions/highlight/languages/brainfuck.js'
import lang_c from '#ehtml/showdown/extensions/highlight/languages/c.js'
import lang_cal from '#ehtml/showdown/extensions/highlight/languages/cal.js'
import lang_capnproto from '#ehtml/showdown/extensions/highlight/languages/capnproto.js'
import lang_ceylon from '#ehtml/showdown/extensions/highlight/languages/ceylon.js'
import lang_clean from '#ehtml/showdown/extensions/highlight/languages/clean.js'
import lang_clojure from '#ehtml/showdown/extensions/highlight/languages/clojure.js'
import lang_clojure_repl from '#ehtml/showdown/extensions/highlight/languages/clojure-repl.js'
import lang_cmake from '#ehtml/showdown/extensions/highlight/languages/cmake.js'
import lang_coffeescript from '#ehtml/showdown/extensions/highlight/languages/coffeescript.js'
import lang_coq from '#ehtml/showdown/extensions/highlight/languages/coq.js'
import lang_cos from '#ehtml/showdown/extensions/highlight/languages/cos.js'
import lang_cpp from '#ehtml/showdown/extensions/highlight/languages/cpp.js'
import lang_crmsh from '#ehtml/showdown/extensions/highlight/languages/crmsh.js'
import lang_crystal from '#ehtml/showdown/extensions/highlight/languages/crystal.js'
import lang_csharp from '#ehtml/showdown/extensions/highlight/languages/csharp.js'
import lang_csp from '#ehtml/showdown/extensions/highlight/languages/csp.js'
import lang_css from '#ehtml/showdown/extensions/highlight/languages/css.js'
import lang_d from '#ehtml/showdown/extensions/highlight/languages/d.js'
import lang_markdown from '#ehtml/showdown/extensions/highlight/languages/markdown.js'
import lang_dart from '#ehtml/showdown/extensions/highlight/languages/dart.js'
import lang_delphi from '#ehtml/showdown/extensions/highlight/languages/delphi.js'
import lang_diff from '#ehtml/showdown/extensions/highlight/languages/diff.js'
import lang_django from '#ehtml/showdown/extensions/highlight/languages/django.js'
import lang_dns from '#ehtml/showdown/extensions/highlight/languages/dns.js'
import lang_dockerfile from '#ehtml/showdown/extensions/highlight/languages/dockerfile.js'
import lang_dos from '#ehtml/showdown/extensions/highlight/languages/dos.js'
import lang_dsconfig from '#ehtml/showdown/extensions/highlight/languages/dsconfig.js'
import lang_dts from '#ehtml/showdown/extensions/highlight/languages/dts.js'
import lang_dust from '#ehtml/showdown/extensions/highlight/languages/dust.js'
import lang_ebnf from '#ehtml/showdown/extensions/highlight/languages/ebnf.js'
import lang_elixir from '#ehtml/showdown/extensions/highlight/languages/elixir.js'
import lang_elm from '#ehtml/showdown/extensions/highlight/languages/elm.js'
import lang_ruby from '#ehtml/showdown/extensions/highlight/languages/ruby.js'
import lang_erb from '#ehtml/showdown/extensions/highlight/languages/erb.js'
import lang_erlang_repl from '#ehtml/showdown/extensions/highlight/languages/erlang-repl.js'
import lang_erlang from '#ehtml/showdown/extensions/highlight/languages/erlang.js'
import lang_excel from '#ehtml/showdown/extensions/highlight/languages/excel.js'
import lang_fix from '#ehtml/showdown/extensions/highlight/languages/fix.js'
import lang_flix from '#ehtml/showdown/extensions/highlight/languages/flix.js'
import lang_fortran from '#ehtml/showdown/extensions/highlight/languages/fortran.js'
import lang_fsharp from '#ehtml/showdown/extensions/highlight/languages/fsharp.js'
import lang_gams from '#ehtml/showdown/extensions/highlight/languages/gams.js'
import lang_gauss from '#ehtml/showdown/extensions/highlight/languages/gauss.js'
import lang_gcode from '#ehtml/showdown/extensions/highlight/languages/gcode.js'
import lang_gherkin from '#ehtml/showdown/extensions/highlight/languages/gherkin.js'
import lang_glsl from '#ehtml/showdown/extensions/highlight/languages/glsl.js'
import lang_gml from '#ehtml/showdown/extensions/highlight/languages/gml.js'
import lang_go from '#ehtml/showdown/extensions/highlight/languages/go.js'
import lang_golo from '#ehtml/showdown/extensions/highlight/languages/golo.js'
import lang_gradle from '#ehtml/showdown/extensions/highlight/languages/gradle.js'
import lang_graphql from '#ehtml/showdown/extensions/highlight/languages/graphql.js'
import lang_groovy from '#ehtml/showdown/extensions/highlight/languages/groovy.js'
import lang_haml from '#ehtml/showdown/extensions/highlight/languages/haml.js'
import lang_handlebars from '#ehtml/showdown/extensions/highlight/languages/handlebars.js'
import lang_haskell from '#ehtml/showdown/extensions/highlight/languages/haskell.js'
import lang_haxe from '#ehtml/showdown/extensions/highlight/languages/haxe.js'
import lang_hsp from '#ehtml/showdown/extensions/highlight/languages/hsp.js'
import lang_http from '#ehtml/showdown/extensions/highlight/languages/http.js'
import lang_hy from '#ehtml/showdown/extensions/highlight/languages/hy.js'
import lang_inform7 from '#ehtml/showdown/extensions/highlight/languages/inform7.js'
import lang_ini from '#ehtml/showdown/extensions/highlight/languages/ini.js'
import lang_irpf90 from '#ehtml/showdown/extensions/highlight/languages/irpf90.js'
import lang_isbl from '#ehtml/showdown/extensions/highlight/languages/isbl.js'
import lang_java from '#ehtml/showdown/extensions/highlight/languages/java.js'
import lang_javascript from '#ehtml/showdown/extensions/highlight/languages/javascript.js'
import lang_jboss_cli from '#ehtml/showdown/extensions/highlight/languages/jboss-cli.js'
import lang_json from '#ehtml/showdown/extensions/highlight/languages/json.js'
import lang_julia from '#ehtml/showdown/extensions/highlight/languages/julia.js'
import lang_julia_repl from '#ehtml/showdown/extensions/highlight/languages/julia-repl.js'
import lang_kotlin from '#ehtml/showdown/extensions/highlight/languages/kotlin.js'
import lang_lasso from '#ehtml/showdown/extensions/highlight/languages/lasso.js'
import lang_latex from '#ehtml/showdown/extensions/highlight/languages/latex.js'
import lang_ldif from '#ehtml/showdown/extensions/highlight/languages/ldif.js'
import lang_leaf from '#ehtml/showdown/extensions/highlight/languages/leaf.js'
import lang_less from '#ehtml/showdown/extensions/highlight/languages/less.js'
import lang_lisp from '#ehtml/showdown/extensions/highlight/languages/lisp.js'
import lang_livecodeserver from '#ehtml/showdown/extensions/highlight/languages/livecodeserver.js'
import lang_livescript from '#ehtml/showdown/extensions/highlight/languages/livescript.js'
import lang_llvm from '#ehtml/showdown/extensions/highlight/languages/llvm.js'
import lang_lsl from '#ehtml/showdown/extensions/highlight/languages/lsl.js'
import lang_lua from '#ehtml/showdown/extensions/highlight/languages/lua.js'
import lang_makefile from '#ehtml/showdown/extensions/highlight/languages/makefile.js'
import lang_mathematica from '#ehtml/showdown/extensions/highlight/languages/mathematica.js'
import lang_matlab from '#ehtml/showdown/extensions/highlight/languages/matlab.js'
import lang_maxima from '#ehtml/showdown/extensions/highlight/languages/maxima.js'
import lang_mel from '#ehtml/showdown/extensions/highlight/languages/mel.js'
import lang_mercury from '#ehtml/showdown/extensions/highlight/languages/mercury.js'
import lang_mipsasm from '#ehtml/showdown/extensions/highlight/languages/mipsasm.js'
import lang_mizar from '#ehtml/showdown/extensions/highlight/languages/mizar.js'
import lang_perl from '#ehtml/showdown/extensions/highlight/languages/perl.js'
import lang_mojolicious from '#ehtml/showdown/extensions/highlight/languages/mojolicious.js'
import lang_monkey from '#ehtml/showdown/extensions/highlight/languages/monkey.js'
import lang_moonscript from '#ehtml/showdown/extensions/highlight/languages/moonscript.js'
import lang_n1ql from '#ehtml/showdown/extensions/highlight/languages/n1ql.js'
import lang_nestedtext from '#ehtml/showdown/extensions/highlight/languages/nestedtext.js'
import lang_nginx from '#ehtml/showdown/extensions/highlight/languages/nginx.js'
import lang_nim from '#ehtml/showdown/extensions/highlight/languages/nim.js'
import lang_nix from '#ehtml/showdown/extensions/highlight/languages/nix.js'
import lang_node_repl from '#ehtml/showdown/extensions/highlight/languages/node-repl.js'
import lang_nsis from '#ehtml/showdown/extensions/highlight/languages/nsis.js'
import lang_objectivec from '#ehtml/showdown/extensions/highlight/languages/objectivec.js'
import lang_ocaml from '#ehtml/showdown/extensions/highlight/languages/ocaml.js'
import lang_openscad from '#ehtml/showdown/extensions/highlight/languages/openscad.js'
import lang_oxygene from '#ehtml/showdown/extensions/highlight/languages/oxygene.js'
import lang_parser3 from '#ehtml/showdown/extensions/highlight/languages/parser3.js'
import lang_pf from '#ehtml/showdown/extensions/highlight/languages/pf.js'
import lang_pgsql from '#ehtml/showdown/extensions/highlight/languages/pgsql.js'
import lang_php from '#ehtml/showdown/extensions/highlight/languages/php.js'
import lang_php_template from '#ehtml/showdown/extensions/highlight/languages/php-template.js'
import lang_plaintext from '#ehtml/showdown/extensions/highlight/languages/plaintext.js'
import lang_pony from '#ehtml/showdown/extensions/highlight/languages/pony.js'
import lang_powershell from '#ehtml/showdown/extensions/highlight/languages/powershell.js'
import lang_processing from '#ehtml/showdown/extensions/highlight/languages/processing.js'
import lang_profile from '#ehtml/showdown/extensions/highlight/languages/profile.js'
import lang_prolog from '#ehtml/showdown/extensions/highlight/languages/prolog.js'
import lang_properties from '#ehtml/showdown/extensions/highlight/languages/properties.js'
import lang_protobuf from '#ehtml/showdown/extensions/highlight/languages/protobuf.js'
import lang_puppet from '#ehtml/showdown/extensions/highlight/languages/puppet.js'
import lang_purebasic from '#ehtml/showdown/extensions/highlight/languages/purebasic.js'
import lang_python from '#ehtml/showdown/extensions/highlight/languages/python.js'
import lang_python_repl from '#ehtml/showdown/extensions/highlight/languages/python-repl.js'
import lang_q from '#ehtml/showdown/extensions/highlight/languages/q.js'
import lang_qml from '#ehtml/showdown/extensions/highlight/languages/qml.js'
import lang_r from '#ehtml/showdown/extensions/highlight/languages/r.js'
import lang_reasonml from '#ehtml/showdown/extensions/highlight/languages/reasonml.js'
import lang_rib from '#ehtml/showdown/extensions/highlight/languages/rib.js'
import lang_roboconf from '#ehtml/showdown/extensions/highlight/languages/roboconf.js'
import lang_routeros from '#ehtml/showdown/extensions/highlight/languages/routeros.js'
import lang_rsl from '#ehtml/showdown/extensions/highlight/languages/rsl.js'
import lang_ruleslanguage from '#ehtml/showdown/extensions/highlight/languages/ruleslanguage.js'
import lang_rust from '#ehtml/showdown/extensions/highlight/languages/rust.js'
import lang_sas from '#ehtml/showdown/extensions/highlight/languages/sas.js'
import lang_scala from '#ehtml/showdown/extensions/highlight/languages/scala.js'
import lang_scheme from '#ehtml/showdown/extensions/highlight/languages/scheme.js'
import lang_scilab from '#ehtml/showdown/extensions/highlight/languages/scilab.js'
import lang_scss from '#ehtml/showdown/extensions/highlight/languages/scss.js'
import lang_shell from '#ehtml/showdown/extensions/highlight/languages/shell.js'
import lang_smali from '#ehtml/showdown/extensions/highlight/languages/smali.js'
import lang_smalltalk from '#ehtml/showdown/extensions/highlight/languages/smalltalk.js'
import lang_sml from '#ehtml/showdown/extensions/highlight/languages/sml.js'
import lang_sqf from '#ehtml/showdown/extensions/highlight/languages/sqf.js'
import lang_sql from '#ehtml/showdown/extensions/highlight/languages/sql.js'
import lang_stan from '#ehtml/showdown/extensions/highlight/languages/stan.js'
import lang_stata from '#ehtml/showdown/extensions/highlight/languages/stata.js'
import lang_step21 from '#ehtml/showdown/extensions/highlight/languages/step21.js'
import lang_stylus from '#ehtml/showdown/extensions/highlight/languages/stylus.js'
import lang_subunit from '#ehtml/showdown/extensions/highlight/languages/subunit.js'
import lang_swift from '#ehtml/showdown/extensions/highlight/languages/swift.js'
import lang_taggerscript from '#ehtml/showdown/extensions/highlight/languages/taggerscript.js'
import lang_yaml from '#ehtml/showdown/extensions/highlight/languages/yaml.js'
import lang_tap from '#ehtml/showdown/extensions/highlight/languages/tap.js'
import lang_tcl from '#ehtml/showdown/extensions/highlight/languages/tcl.js'
import lang_thrift from '#ehtml/showdown/extensions/highlight/languages/thrift.js'
import lang_tp from '#ehtml/showdown/extensions/highlight/languages/tp.js'
import lang_twig from '#ehtml/showdown/extensions/highlight/languages/twig.js'
import lang_typescript from '#ehtml/showdown/extensions/highlight/languages/typescript.js'
import lang_vala from '#ehtml/showdown/extensions/highlight/languages/vala.js'
import lang_vbnet from '#ehtml/showdown/extensions/highlight/languages/vbnet.js'
import lang_vbscript from '#ehtml/showdown/extensions/highlight/languages/vbscript.js'
import lang_vbscript_html from '#ehtml/showdown/extensions/highlight/languages/vbscript-html.js'
import lang_verilog from '#ehtml/showdown/extensions/highlight/languages/verilog.js'
import lang_vhdl from '#ehtml/showdown/extensions/highlight/languages/vhdl.js'
import lang_vim from '#ehtml/showdown/extensions/highlight/languages/vim.js'
import lang_wasm from '#ehtml/showdown/extensions/highlight/languages/wasm.js'
import lang_wren from '#ehtml/showdown/extensions/highlight/languages/wren.js'
import lang_x86asm from '#ehtml/showdown/extensions/highlight/languages/x86asm.js'
import lang_xl from '#ehtml/showdown/extensions/highlight/languages/xl.js'
import lang_xquery from '#ehtml/showdown/extensions/highlight/languages/xquery.js'
import lang_zephir from '#ehtml/showdown/extensions/highlight/languages/zephir.js'

hljs.registerLanguage('1c', lang_1c)
hljs.registerLanguage('abnf', lang_abnf)
hljs.registerLanguage('accesslog', lang_accesslog)
hljs.registerLanguage('actionscript', lang_actionscript)
hljs.registerLanguage('ada', lang_ada)
hljs.registerLanguage('angelscript', lang_angelscript)
hljs.registerLanguage('apache', lang_apache)
hljs.registerLanguage('applescript', lang_applescript)
hljs.registerLanguage('arcade', lang_arcade)
hljs.registerLanguage('arduino', lang_arduino)
hljs.registerLanguage('armasm', lang_armasm)
hljs.registerLanguage('xml', lang_xml)
hljs.registerLanguage('asciidoc', lang_asciidoc)
hljs.registerLanguage('aspectj', lang_aspectj)
hljs.registerLanguage('autohotkey', lang_autohotkey)
hljs.registerLanguage('autoit', lang_autoit)
hljs.registerLanguage('avrasm', lang_avrasm)
hljs.registerLanguage('awk', lang_awk)
hljs.registerLanguage('axapta', lang_axapta)
hljs.registerLanguage('bash', lang_bash)
hljs.registerLanguage('basic', lang_basic)
hljs.registerLanguage('bnf', lang_bnf)
hljs.registerLanguage('brainfuck', lang_brainfuck)
hljs.registerLanguage('c', lang_c)
hljs.registerLanguage('cal', lang_cal)
hljs.registerLanguage('capnproto', lang_capnproto)
hljs.registerLanguage('ceylon', lang_ceylon)
hljs.registerLanguage('clean', lang_clean)
hljs.registerLanguage('clojure', lang_clojure)
hljs.registerLanguage('clojure-repl', lang_clojure_repl)
hljs.registerLanguage('cmake', lang_cmake)
hljs.registerLanguage('coffeescript', lang_coffeescript)
hljs.registerLanguage('coq', lang_coq)
hljs.registerLanguage('cos', lang_cos)
hljs.registerLanguage('cpp', lang_cpp)
hljs.registerLanguage('crmsh', lang_crmsh)
hljs.registerLanguage('crystal', lang_crystal)
hljs.registerLanguage('csharp', lang_csharp)
hljs.registerLanguage('csp', lang_csp)
hljs.registerLanguage('css', lang_css)
hljs.registerLanguage('d', lang_d)
hljs.registerLanguage('markdown', lang_markdown)
hljs.registerLanguage('dart', lang_dart)
hljs.registerLanguage('delphi', lang_delphi)
hljs.registerLanguage('diff', lang_diff)
hljs.registerLanguage('django', lang_django)
hljs.registerLanguage('dns', lang_dns)
hljs.registerLanguage('dockerfile', lang_dockerfile)
hljs.registerLanguage('dos', lang_dos)
hljs.registerLanguage('dsconfig', lang_dsconfig)
hljs.registerLanguage('dts', lang_dts)
hljs.registerLanguage('dust', lang_dust)
hljs.registerLanguage('ebnf', lang_ebnf)
hljs.registerLanguage('elixir', lang_elixir)
hljs.registerLanguage('elm', lang_elm)
hljs.registerLanguage('ruby', lang_ruby)
hljs.registerLanguage('erb', lang_erb)
hljs.registerLanguage('erlang-repl', lang_erlang_repl)
hljs.registerLanguage('erlang', lang_erlang)
hljs.registerLanguage('excel', lang_excel)
hljs.registerLanguage('fix', lang_fix)
hljs.registerLanguage('flix', lang_flix)
hljs.registerLanguage('fortran', lang_fortran)
hljs.registerLanguage('fsharp', lang_fsharp)
hljs.registerLanguage('gams', lang_gams)
hljs.registerLanguage('gauss', lang_gauss)
hljs.registerLanguage('gcode', lang_gcode)
hljs.registerLanguage('gherkin', lang_gherkin)
hljs.registerLanguage('glsl', lang_glsl)
hljs.registerLanguage('gml', lang_gml)
hljs.registerLanguage('go', lang_go)
hljs.registerLanguage('golo', lang_golo)
hljs.registerLanguage('gradle', lang_gradle)
hljs.registerLanguage('graphql', lang_graphql)
hljs.registerLanguage('groovy', lang_groovy)
hljs.registerLanguage('haml', lang_haml)
hljs.registerLanguage('handlebars', lang_handlebars)
hljs.registerLanguage('haskell', lang_haskell)
hljs.registerLanguage('haxe', lang_haxe)
hljs.registerLanguage('hsp', lang_hsp)
hljs.registerLanguage('http', lang_http)
hljs.registerLanguage('hy', lang_hy)
hljs.registerLanguage('inform7', lang_inform7)
hljs.registerLanguage('ini', lang_ini)
hljs.registerLanguage('irpf90', lang_irpf90)
hljs.registerLanguage('isbl', lang_isbl)
hljs.registerLanguage('java', lang_java)
hljs.registerLanguage('javascript', lang_javascript)
hljs.registerLanguage('jboss-cli', lang_jboss_cli)
hljs.registerLanguage('json', lang_json)
hljs.registerLanguage('julia', lang_julia)
hljs.registerLanguage('julia-repl', lang_julia_repl)
hljs.registerLanguage('kotlin', lang_kotlin)
hljs.registerLanguage('lasso', lang_lasso)
hljs.registerLanguage('latex', lang_latex)
hljs.registerLanguage('ldif', lang_ldif)
hljs.registerLanguage('leaf', lang_leaf)
hljs.registerLanguage('less', lang_less)
hljs.registerLanguage('lisp', lang_lisp)
hljs.registerLanguage('livecodeserver', lang_livecodeserver)
hljs.registerLanguage('livescript', lang_livescript)
hljs.registerLanguage('llvm', lang_llvm)
hljs.registerLanguage('lsl', lang_lsl)
hljs.registerLanguage('lua', lang_lua)
hljs.registerLanguage('makefile', lang_makefile)
hljs.registerLanguage('mathematica', lang_mathematica)
hljs.registerLanguage('matlab', lang_matlab)
hljs.registerLanguage('maxima', lang_maxima)
hljs.registerLanguage('mel', lang_mel)
hljs.registerLanguage('mercury', lang_mercury)
hljs.registerLanguage('mipsasm', lang_mipsasm)
hljs.registerLanguage('mizar', lang_mizar)
hljs.registerLanguage('perl', lang_perl)
hljs.registerLanguage('mojolicious', lang_mojolicious)
hljs.registerLanguage('monkey', lang_monkey)
hljs.registerLanguage('moonscript', lang_moonscript)
hljs.registerLanguage('n1ql', lang_n1ql)
hljs.registerLanguage('nestedtext', lang_nestedtext)
hljs.registerLanguage('nginx', lang_nginx)
hljs.registerLanguage('nim', lang_nim)
hljs.registerLanguage('nix', lang_nix)
hljs.registerLanguage('node-repl', lang_node_repl)
hljs.registerLanguage('nsis', lang_nsis)
hljs.registerLanguage('objectivec', lang_objectivec)
hljs.registerLanguage('ocaml', lang_ocaml)
hljs.registerLanguage('openscad', lang_openscad)
hljs.registerLanguage('oxygene', lang_oxygene)
hljs.registerLanguage('parser3', lang_parser3)
hljs.registerLanguage('pf', lang_pf)
hljs.registerLanguage('pgsql', lang_pgsql)
hljs.registerLanguage('php', lang_php)
hljs.registerLanguage('php-template', lang_php_template)
hljs.registerLanguage('plaintext', lang_plaintext)
hljs.registerLanguage('pony', lang_pony)
hljs.registerLanguage('powershell', lang_powershell)
hljs.registerLanguage('processing', lang_processing)
hljs.registerLanguage('profile', lang_profile)
hljs.registerLanguage('prolog', lang_prolog)
hljs.registerLanguage('properties', lang_properties)
hljs.registerLanguage('protobuf', lang_protobuf)
hljs.registerLanguage('puppet', lang_puppet)
hljs.registerLanguage('purebasic', lang_purebasic)
hljs.registerLanguage('python', lang_python)
hljs.registerLanguage('python-repl', lang_python_repl)
hljs.registerLanguage('q', lang_q)
hljs.registerLanguage('qml', lang_qml)
hljs.registerLanguage('r', lang_r)
hljs.registerLanguage('reasonml', lang_reasonml)
hljs.registerLanguage('rib', lang_rib)
hljs.registerLanguage('roboconf', lang_roboconf)
hljs.registerLanguage('routeros', lang_routeros)
hljs.registerLanguage('rsl', lang_rsl)
hljs.registerLanguage('ruleslanguage', lang_ruleslanguage)
hljs.registerLanguage('rust', lang_rust)
hljs.registerLanguage('sas', lang_sas)
hljs.registerLanguage('scala', lang_scala)
hljs.registerLanguage('scheme', lang_scheme)
hljs.registerLanguage('scilab', lang_scilab)
hljs.registerLanguage('scss', lang_scss)
hljs.registerLanguage('shell', lang_shell)
hljs.registerLanguage('smali', lang_smali)
hljs.registerLanguage('smalltalk', lang_smalltalk)
hljs.registerLanguage('sml', lang_sml)
hljs.registerLanguage('sqf', lang_sqf)
hljs.registerLanguage('sql', lang_sql)
hljs.registerLanguage('stan', lang_stan)
hljs.registerLanguage('stata', lang_stata)
hljs.registerLanguage('step21', lang_step21)
hljs.registerLanguage('stylus', lang_stylus)
hljs.registerLanguage('subunit', lang_subunit)
hljs.registerLanguage('swift', lang_swift)
hljs.registerLanguage('taggerscript', lang_taggerscript)
hljs.registerLanguage('yaml', lang_yaml)
hljs.registerLanguage('tap', lang_tap)
hljs.registerLanguage('tcl', lang_tcl)
hljs.registerLanguage('thrift', lang_thrift)
hljs.registerLanguage('tp', lang_tp)
hljs.registerLanguage('twig', lang_twig)
hljs.registerLanguage('typescript', lang_typescript)
hljs.registerLanguage('vala', lang_vala)
hljs.registerLanguage('vbnet', lang_vbnet)
hljs.registerLanguage('vbscript', lang_vbscript)
hljs.registerLanguage('vbscript-html', lang_vbscript_html)
hljs.registerLanguage('verilog', lang_verilog)
hljs.registerLanguage('vhdl', lang_vhdl)
hljs.registerLanguage('vim', lang_vim)
hljs.registerLanguage('wasm', lang_wasm)
hljs.registerLanguage('wren', lang_wren)
hljs.registerLanguage('x86asm', lang_x86asm)
hljs.registerLanguage('xl', lang_xl)
hljs.registerLanguage('xquery', lang_xquery)
hljs.registerLanguage('zephir', lang_zephir)

export default hljs
