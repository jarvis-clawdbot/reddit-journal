(module
  (func $calculateHotScore (export "calculateHotScore") 
    (param $upvotes i32) (param $downvotes i32) (param $timestamp i32)
    (result f32)
    
    ;; Hot score formula similar to Reddit's
    (local $score f32)
    (local $order f32)
    (local $seconds f32)
    
    ;; Calculate score (upvotes - downvotes)
    (local.set $score 
      (f32.convert_i32_s 
        (i32.sub (local.get $upvotes) (local.get $downvotes))
      )
    )
    
    ;; Calculate order (log10 of max(score, 1))
    (local.set $order 
      (f32.log10 
        (f32.max (local.get $score) (f32.const 1.0))
      )
    )
    
    ;; Convert timestamp to seconds
    (local.set $seconds 
      (f32.div 
        (f32.convert_i32_s (local.get $timestamp))
        (f32.const 1000.0)
      )
    )
    
    ;; Reddit hot formula: order + seconds / 45000
    (f32.add 
      (local.get $order)
      (f32.div (local.get $seconds) (f32.const 45000.0))
    )
  )
  
  (func $calculateControversy (export "calculateControversy")
    (param $upvotes i32) (param $downvotes i32)
    (result f32)
    
    ;; Controversy formula: (upvotes + downvotes) / max(|upvotes - downvotes|, 1)
    (local $total i32)
    (local $difference i32)
    
    (local.set $total 
      (i32.add (local.get $upvotes) (local.get $downvotes))
    )
    
    (local.set $difference 
      (i32.abs 
        (i32.sub (local.get $upvotes) (local.get $downvotes))
      )
    )
    
    (f32.div 
      (f32.convert_i32_s (local.get $total))
      (f32.convert_i32_s 
        (i32.max (local.get $difference) (i32.const 1))
      )
    )
  )
)