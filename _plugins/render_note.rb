# _plugins/render_note.rb
module Criipto

    module Base
        def initialize (tag_name, params_string, tokens)
          super
          bind_params(params_string.split(" "))
        end
    
        def markdown_converter
          @context.registers[:site].find_converter_instance(::Jekyll::Converters::Markdown)
        end
    
        def id
          @context.registers[:page].id.split('/').last.gsub('-', '_').downcase
        end
    
        def category
          @context.registers[:page]['category']
        end
    end

    class Block < Liquid::Block
        include Criipto::Base
      
        def render (context)
            @context = context
            @text = super
            internal_render
        end
    end
    
    class RenderNote < Criipto::Block
  
        def bind_params (params)
            @type = params[0]
        end

        def internal_render
            <<~NOTE
                <div class=\"alert alert-#{@type}\" role=\"alert\">
                    <div class="alert-content">
                        #{markdown_converter.convert(@text)}
                    </div>
                </div>
            NOTE
        end
    end


    class RenderNoteWithIcon < Criipto::Block
  
        def bind_params (params)
            @type = params[0]
            case (@type)
            when 'note' 
                @icon = 'fa-file-text-o'
                @type = 'secondary'
            when 'success'
                @icon = 'fa-check'
            when 'info'
                @icon = 'fa-info'
                @type = 'secondary'
            when 'warning'
                @icon = 'fa-exclamation'
            when 'danger'
                @icon = 'fa-times'
            end
        end 
  
        def internal_render
            <<~ICONNOTE
            <div class=\"alert alert-#{@type} alert-with-icon\" role=\"alert\">
                <i class="fa #{@icon}"></i> 
                    <div class="alert-content">
                        #{markdown_converter.convert(@text)}
                    </div>
                </div>
            ICONNOTE
        end
  
    end
  
  end
  
  Liquid::Template.register_tag('note', Criipto::RenderNote)
  Liquid::Template.register_tag('iconnote', Criipto::RenderNoteWithIcon)